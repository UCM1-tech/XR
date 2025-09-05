"use client";
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
  productType: string;
  productName: string;
  onViewModeChange?: (mode: '2D' | '3D' | 'AR') => void;
}

// 3D模型组件
function ProductModel({ productType }: { productType: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // 根据产品类型创建不同的3D模型
  const createModel = () => {
    switch (productType) {
      case 'clothing':
        return (
          <group>
            {/* 衣服主体 */}
            <mesh
              ref={meshRef}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => setClicked(!clicked)}
              scale={clicked ? 1.1 : 1}
            >
              <cylinderGeometry args={[0.5, 0.6, 1.2, 8]} />
              <meshStandardMaterial 
                color={hovered ? '#667eea' : '#4a5568'} 
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
            {/* 袖子 */}
            <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
              <meshStandardMaterial color="#4a5568" />
            </mesh>
            <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
              <meshStandardMaterial color="#4a5568" />
            </mesh>
          </group>
        );
        
      case 'electronics':
        return (
          <group>
            {/* 设备主体 */}
            <mesh
              ref={meshRef}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => setClicked(!clicked)}
              scale={clicked ? 1.1 : 1}
            >
              <boxGeometry args={[1.2, 0.8, 0.1]} />
              <meshStandardMaterial 
                color={hovered ? '#38b2ac' : '#2d3748'} 
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            {/* 屏幕 */}
            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[1, 0.6]} />
              <meshStandardMaterial color="#000000" emissive="#1a202c" />
            </mesh>
            {/* 按钮 */}
            <mesh position={[0.4, -0.25, 0.06]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 8]} />
              <meshStandardMaterial color="#4a5568" />
            </mesh>
          </group>
        );
        
      case 'furniture':
        return (
          <group>
            {/* 家具主体 */}
            <mesh
              ref={meshRef}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              onClick={() => setClicked(!clicked)}
              scale={clicked ? 1.1 : 1}
            >
              <boxGeometry args={[1.5, 0.8, 0.6]} />
              <meshStandardMaterial 
                color={hovered ? '#d69e2e' : '#8b4513'} 
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
            {/* 腿部 */}
            {[0, 1, 2, 3].map((i) => (
              <mesh key={i} position={[i % 2 === 0 ? -0.6 : 0.6, -0.4, i < 2 ? -0.2 : 0.2]}>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
            ))}
          </group>
        );
        
      default:
        return (
          <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setClicked(!clicked)}
            scale={clicked ? 1.1 : 1}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={hovered ? '#e53e3e' : '#718096'} 
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
        );
    }
  };

  // 动画效果
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (hovered) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {createModel()}
    </Float>
  );
}

// 产品标签
function ProductLabel({ productName }: { productName: string }) {
  return (
    <Text
      position={[0, 1.5, 0]}
      fontSize={0.2}
      color="#2d3748"
      anchorX="center"
      anchorY="middle"
      font="/fonts/NotoSansSC-Regular.otf"
    >
      {productName}
    </Text>
  );
}

// 控制面板
function ControlPanel({ onViewModeChange }: { onViewModeChange?: (mode: '2D' | '3D' | 'AR') => void }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      zIndex: 10
    }}>
      <button
        onClick={() => onViewModeChange?.('2D')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        2D视图
      </button>
      <button
        onClick={() => onViewModeChange?.('3D')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#38b2ac',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        3D视图
      </button>
      <button
        onClick={() => onViewModeChange?.('AR')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#e53e3e',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        AR试穿
      </button>
    </div>
  );
}

export default function Product3DViewer({ productType, productName, onViewModeChange }: Product3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fafc',
        borderRadius: '12px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔄</div>
          <p style={{ color: '#4a5568' }}>加载3D模型中...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ borderRadius: '12px', backgroundColor: '#f7fafc' }}
      >
        {/* 环境光照 */}
        <Environment preset="studio" />
        
        {/* 环境光 */}
        <ambientLight intensity={0.4} />
        
        {/* 方向光 */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* 点光源 */}
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* 产品模型 */}
        <ProductModel productType={productType} />
        
        {/* 产品标签 */}
        <ProductLabel productName={productName} />
        
        {/* 控制器 */}
        <PresentationControls
          global
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
          />
        </PresentationControls>
      </Canvas>
      
      {/* 控制面板 */}
      <ControlPanel onViewModeChange={onViewModeChange} />
      
      {/* 交互提示 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '0.8rem'
      }}>
        💡 拖拽旋转 • 滚轮缩放 • 点击交互
      </div>
    </div>
  );
} 