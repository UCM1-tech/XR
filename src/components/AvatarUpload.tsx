"use client";
import { useState, useRef, useCallback } from 'react';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
  size?: number;
}

export default function AvatarUpload({ 
  currentAvatar, 
  onAvatarChange, 
  size = 120 
}: AvatarUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 验证文件大小 (最大 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    setIsUploading(true);

    // 创建预览
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      
      // 模拟上传到服务器
      setTimeout(() => {
        onAvatarChange(result);
        setIsUploading(false);
      }, 1000);
    };
    reader.readAsDataURL(file);
  }, [onAvatarChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const displayAvatar = previewUrl || currentAvatar;

  return (
    <div style={{ textAlign: 'center' }}>
      {/* 头像显示区域 */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          margin: '0 auto 20px',
          position: 'relative',
          cursor: 'pointer',
          border: isDragging ? '3px dashed #667eea' : '3px solid #e2e8f0',
          backgroundColor: displayAvatar ? 'transparent' : '#667eea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.4,
          color: 'white',
          fontWeight: 'bold',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt="头像"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        ) : (
          getInitials()
        )}

        {/* 上传中遮罩 */}
        {isUploading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}>
            <div style={{ fontSize: '1.5rem' }}>⏳</div>
          </div>
        )}

        {/* 编辑图标 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 32,
          height: 32,
          backgroundColor: '#667eea',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1rem',
          border: '3px solid white'
        }}>
          📷
        </div>
      </div>

      {/* 文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      {/* 上传提示 */}
      <div style={{
        marginBottom: '15px',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: '0 0 5px 0' }}>
          {isDragging ? '释放鼠标上传图片' : '点击或拖拽上传头像'}
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem' }}>
          支持 JPG、PNG 格式，最大 5MB
        </p>
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleClick}
          disabled={isUploading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            opacity: isUploading ? 0.6 : 1
          }}
        >
          {isUploading ? '上传中...' : '选择图片'}
        </button>
        
        {displayAvatar && (
          <button
            onClick={() => {
              setPreviewUrl(null);
              onAvatarChange('');
            }}
            disabled={isUploading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              opacity: isUploading ? 0.6 : 1
            }}
          >
            删除头像
          </button>
        )}
      </div>

      {/* 拖拽提示 */}
      {isDragging && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📁</div>
            <p style={{ margin: 0, color: '#667eea', fontWeight: 'bold' }}>
              释放鼠标上传头像
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 