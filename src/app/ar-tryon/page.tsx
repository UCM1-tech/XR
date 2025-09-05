"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ARTryOnPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('pending');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 模拟商品数据
  const products = [
    { id: 1, name: '时尚T恤', type: 'shirt', emoji: '👕', price: '¥299' },
    { id: 2, name: '休闲牛仔裤', type: 'pants', emoji: '👖', price: '¥399' },
    { id: 3, name: '优雅连衣裙', type: 'dress', emoji: '👗', price: '¥599' },
    { id: 4, name: '运动外套', type: 'jacket', emoji: '🧥', price: '¥499' },
  ];

  // 启动摄像头
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCameraPermission('granted');
      }
    } catch (error) {
      console.error('摄像头启动失败:', error);
      setCameraPermission('denied');
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // 拍照功能
  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = 'ar-tryon-photo.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // 组件卸载时停止摄像头
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 顶部控制栏 */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>虚拟试衣间</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>AR 实时试穿体验</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              style={{
                padding: '10px 20px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              启动摄像头
            </button>
          ) : (
            <button
              onClick={stopCamera}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              停止摄像头
            </button>
          )}
          
          <Link href="/products">
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer'
            }}>
              返回商品
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
        {/* 左侧：摄像头画面区域 */}
        <div style={{ 
          flex: 1, 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            {!isCameraActive ? (
              <div style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                color: '#666',
                fontSize: '1.2rem'
              }}>
                {cameraPermission === 'denied' ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📷</div>
                    <p>摄像头权限被拒绝</p>
                    <p>请在浏览器设置中允许摄像头访问</p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📷</div>
                    <p>点击&ldquo;启动摄像头&rdquo;开始试穿体验</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover'
                  }}
                />
                {/* AR 叠加层 */}
                {selectedProduct && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '8rem',
                    pointerEvents: 'none',
                    opacity: 0.8
                  }}>
                    {selectedProduct.emoji}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 控制面板 */}
          {isCameraActive && (
            <div style={{
              marginTop: '20px',
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button
                onClick={takePhoto}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📸 拍照
              </button>
              
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🔄 旋转
              </button>
              
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📤 分享
              </button>
            </div>
          )}

          {/* 隐藏的 canvas 用于拍照 */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {/* 右侧：商品选择栏 */}
        <div style={{
          width: '300px',
          backgroundColor: 'white',
          borderLeft: '1px solid #eee',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>选择试穿商品</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                style={{
                  padding: '15px',
                  border: selectedProduct?.id === product.id ? '2px solid #667eea' : '1px solid #eee',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedProduct?.id === product.id ? '#f8f9ff' : 'white',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>{product.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{product.name}</h4>
                    <p style={{ margin: 0, color: '#667eea', fontWeight: 'bold' }}>{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 试穿提示 */}
          <div style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '10px',
            border: '1px solid #bbdefb'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>💡 试穿提示</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#1976d2', fontSize: '0.9rem' }}>
              <li>确保光线充足</li>
              <li>保持适当距离</li>
              <li>缓慢移动以获得最佳效果</li>
              <li>可以拍照保存试穿效果</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 