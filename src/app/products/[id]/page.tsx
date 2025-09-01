"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductById, type Product } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import Product3DViewerWrapper, { ProductARViewer } from '@/components/Product3DViewerWrapper';

export default function ProductDetailPage() {
  const params = useParams();
  const id = String(params?.id || '');
  const [product, setProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d' | 'ar'>('2d');
  
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    if (id) fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div style={{ maxWidth: 960, margin: '40px auto' }}>加载中...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        {/* 商品信息 */}
        <div>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>{product.description}</p>
          {product.price && (
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginBottom: '20px' }}>
              ¥{product.price}
            </p>
          )}
          
          {/* 操作按钮 */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button 
              onClick={() => addItem(product)}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              加入购物车
            </button>
            <button 
              onClick={() => toggleFavorite(product)}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: isFavorite(product._id) ? '#dc3545' : '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {isFavorite(product._id) ? '取消收藏' : '收藏'}
            </button>
          </div>

          {/* 商品详情 */}
          <div style={{ marginTop: '20px' }}>
            <h3>商品详情</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>商品ID:</strong> {product._id}
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>分类:</strong> {product.category || '未分类'}
              </li>
              {product.brand && (
                <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>品牌:</strong> {product.brand}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* 预览区域 */}
        <div>
          {/* 预览模式切换 */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setViewMode('2d')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: viewMode === '2d' ? '#007bff' : '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              2D 图片
            </button>
            <button 
              onClick={() => setViewMode('3d')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: viewMode === '3d' ? '#007bff' : '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              3D 预览
            </button>
            <button 
              onClick={() => setViewMode('ar')}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: viewMode === 'ar' ? '#007bff' : '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              AR 预览
            </button>
          </div>

          {/* 预览内容 */}
          {viewMode === '2d' && (
            <div style={{ 
              height: 400, 
              border: '1px solid #eee', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '18px', color: '#666' }}>2D 图片预览</span>
            </div>
          )}
          
          {viewMode === '3d' && (
            <Product3DViewerWrapper 
              productName={product.name} 
              productType={product.category as 'clothing' | 'electronics' | 'furniture'}
            />
          )}
          
          {viewMode === 'ar' && (
            <ProductARViewer productName={product.name} />
          )}
        </div>
      </div>
    </div>
  );
}

