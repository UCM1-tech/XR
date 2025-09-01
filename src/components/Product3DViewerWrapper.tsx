"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 动态导入 Three.js 组件，避免 SSR 问题
const Product3DViewer = dynamic(() => import('@/components/Product3DViewer'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '400px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载 3D 预览...</div>
});

const ProductARViewer = dynamic(() => import('@/components/ProductARViewer'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '400px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载 AR 预览...</div>
});

interface Product3DViewerProps {
  productName: string;
  productType?: 'clothing' | 'electronics' | 'furniture';
}

export default function Product3DViewerWrapper({ productName, productType = 'clothing' }: Product3DViewerProps) {
  return (
    <Suspense fallback={<div style={{ width: '100%', height: '400px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载中...</div>}>
      <Product3DViewer productName={productName} productType={productType} />
    </Suspense>
  );
}

export { ProductARViewer }; 