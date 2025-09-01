"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text, Cylinder } from '@react-three/drei';
import { Suspense } from 'react';

interface Product3DViewerProps {
  productName: string;
  productType?: 'clothing' | 'electronics' | 'furniture';
}

export default function Product3DViewer({ productName, productType = 'clothing' }: Product3DViewerProps) {
  const renderProduct = () => {
    switch (productType) {
      case 'electronics':
        return (
          <>
            {/* 电子产品 - 手机/平板 */}
            <Box args={[0.8, 0.1, 1.2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#333" />
            </Box>
            <Box args={[0.7, 0.05, 1.1]} position={[0, 0.075, 0]}>
              <meshStandardMaterial color="#000" />
            </Box>
          </>
        );
      case 'furniture':
        return (
          <>
            {/* 家具 - 椅子 */}
            <Box args={[0.6, 0.1, 0.6]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.1, 0.8, 0.6]} position={[0, 0.4, -0.25]}>
              <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.6, 0.1, 0.1]} position={[0, 0.8, -0.25]}>
              <meshStandardMaterial color="#8B4513" />
            </Box>
          </>
        );
      default:
        return (
          <>
            {/* 服装 - T恤 */}
            <Box args={[1, 0.1, 1.2]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#FF6B6B" />
            </Box>
            {/* 袖子 */}
            <Cylinder args={[0.15, 0.15, 0.8]} position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#FF6B6B" />
            </Cylinder>
            <Cylinder args={[0.15, 0.15, 0.8]} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial color="#FF6B6B" />
            </Cylinder>
            {/* 领子 */}
            <Cylinder args={[0.3, 0.3, 0.1]} position={[0, 0.1, -0.5]}>
              <meshStandardMaterial color="#FF6B6B" />
            </Cylinder>
          </>
        );
    }
  };

  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ddd' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} />
          
          {/* 产品模型 */}
          {renderProduct()}
          
          {/* 商品名称标签 */}
          <Text
            position={[0, 2, 0]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {productName}
          </Text>
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
} 