"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts, searchProducts, type Product } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  
  // 直接使用 store hooks
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    fetchProducts().then((data) => { setProducts(data); setLoading(false); });
  }, []);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = q ? await searchProducts(q) : await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const filteredAndSortedProducts = products
    .filter(product => category === 'all' || product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
      <h1>商品列表</h1>
      
      {/* 搜索和筛选 */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '20px',
        alignItems: 'center'
      }}>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            placeholder="搜索关键词" 
            value={q} 
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: '8px', width: '200px' }}
          />
          <button type="submit" style={{ 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}>
            搜索
          </button>
        </form>
        
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="all">所有分类</option>
          <option value="clothing">服装</option>
          <option value="electronics">电子产品</option>
          <option value="furniture">家具</option>
        </select>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="name">按名称</option>
          <option value="price">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
        </select>
      </div>
      
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredAndSortedProducts.map(p => (
            <div key={p._id} style={{ 
              border: '1px solid #eee', 
              padding: '1rem', 
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              {p.price && <p style={{ fontWeight: 'bold', color: '#007bff' }}>¥{p.price}</p>}
              
              <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <Link href={`/products/${p._id}`} style={{ flex: 1 }}>
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
                  onClick={() => addItem(p)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  加入购物车
                </button>
                <button 
                  onClick={() => toggleFavorite(p)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: isFavorite(p._id) ? '#dc3545' : '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  {isFavorite(p._id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredAndSortedProducts.length === 0 && !loading && (
        <p>没有找到相关商品</p>
      )}
    </div>
  );
}

