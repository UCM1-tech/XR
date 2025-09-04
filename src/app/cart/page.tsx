"use client";
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 960, margin: '40px auto' }}>
        <h1>购物车</h1>
        <p>购物车是空的</p>
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
      <h1>购物车</h1>
      
      {items.map((item) => (
        <div key={item.product._id} style={{ 
          border: '1px solid #eee', 
          padding: '1rem', 
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3>{item.product.name}</h3>
            <p>{item.product.description}</p>
            {item.product.price && <p>单价: ¥{item.product.price}</p>}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
              style={{ padding: '4px 8px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
              style={{ padding: '4px 8px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              +
            </button>
            <button 
              onClick={() => removeItem(item.product._id)}
              style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              删除
            </button>
          </div>
        </div>
      ))}
      
      <div style={{ 
        borderTop: '2px solid #eee', 
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3>总计: ¥{totalPrice}</h3>
        </div>
        <div>
          <button 
            style={{ 
              marginRight: '10px', 
              padding: '8px 16px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            清空购物车
          </button>
          <Link href="/checkout">
            <button 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px' 
              }}
            >
              结算
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 