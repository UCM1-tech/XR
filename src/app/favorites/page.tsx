"use client";
import { useFavoritesStore } from '@/store/favorites';
import Link from 'next/link';

export default function FavoritesPage() {
  const { items, removeItem } = useFavoritesStore();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 960, margin: '40px auto' }}>
        <h1>我的收藏</h1>
        <p>还没有收藏任何商品</p>
        <Link href="/products">
          <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            去购物
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '40px auto' }}>
      <h1>我的收藏 ({items.length})</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map((product) => (
          <div key={product._id} style={{ 
            border: '1px solid #eee', 
            padding: '1rem', 
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {product.price && <p style={{ fontWeight: 'bold', color: '#007bff' }}>¥{product.price}</p>}
            
            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
              <Link href={`/products/${product._id}`} style={{ flex: 1 }}>
                <button style={{ 
                  width: '100%', 
                  padding: '8px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px' 
                }}>
                  查看详情
                </button>
              </Link>
              <button 
                onClick={() => removeItem(product._id)}
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px' 
                }}
              >
                取消收藏
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 