"use client";
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, token } = useAuthStore();
  const { totalItems, totalPrice } = useCartStore();
  const { items: favorites } = useFavoritesStore();

  if (!token) {
    return (
      <div style={{ maxWidth: 960, margin: '40px auto', textAlign: 'center' }}>
        <h1>用户仪表板</h1>
        <p>请先登录以查看您的仪表板</p>
        <Link href="/login">
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            去登录
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
      <h1>欢迎回来，{user?.username || '用户'}！</h1>
      
      {/* 统计卡片 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>购物车</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalItems} 件商品</p>
          <p>总计: ¥{totalPrice}</p>
          <Link href="/cart">
            <button style={{ 
              marginTop: '10px',
              padding: '8px 16px', 
              backgroundColor: 'white', 
              color: '#007bff', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              查看购物车
            </button>
          </Link>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>收藏</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{favorites.length} 件商品</p>
          <p>收藏的商品</p>
          <Link href="/favorites">
            <button style={{ 
              marginTop: '10px',
              padding: '8px 16px', 
              backgroundColor: 'white', 
              color: '#28a745', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              查看收藏
            </button>
          </Link>
        </div>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#ffc107', 
          color: 'white', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>订单</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0 个订单</p>
          <p>暂无订单记录</p>
          <Link href="/products">
            <button style={{ 
              marginTop: '10px',
              padding: '8px 16px', 
              backgroundColor: 'white', 
              color: '#ffc107', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              去购物
            </button>
          </Link>
        </div>
      </div>

      {/* 快速操作 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>快速操作</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/products">
            <button style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              浏览商品
            </button>
          </Link>
          <Link href="/profile">
            <button style={{ 
              padding: '10px 20px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              编辑资料
            </button>
          </Link>
          <Link href="/cart">
            <button style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              去结算
            </button>
          </Link>
        </div>
      </div>

      {/* 最近活动 */}
      <div>
        <h2>最近活动</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <p style={{ color: '#666', margin: 0 }}>
            {totalItems > 0 
              ? `您有 ${totalItems} 件商品在购物车中，总价值 ¥${totalPrice}`
              : '您还没有添加任何商品到购物车'
            }
          </p>
          {favorites.length > 0 && (
            <p style={{ color: '#666', margin: '10px 0 0 0' }}>
              您收藏了 {favorites.length} 件商品
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 