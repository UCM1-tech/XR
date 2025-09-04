"use client";
import { Canvas } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { Suspense } from 'react';

interface ProductARViewerProps {
  productName: string;
}

export default function ProductARViewer({ productName }: ProductARViewerProps) {
  return (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ddd', position: 'relative' }}>
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        zIndex: 10,
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        AR 预览 (需要 WebXR 支持)
      </div>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {/* 简化的 AR 商品模型 */}
          <Box args={[0.5, 0.5, 0.5]} position={[0, 0, -1]}>
            <meshStandardMaterial color="blue" />
          </Box>
          
          {/* 商品名称标签 */}
          <Text
            position={[0, 1, -1]}
            fontSize={0.3}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            {productName}
          </Text>
        </Suspense>
      </Canvas>
    </div>
  );
} 