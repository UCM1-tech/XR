"use client";
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('alipay');

  // 计算总价
  const subtotal = items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 20; // 满500免运费
  const total = subtotal + shipping;

  // 处理表单提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  // 处理下单
  const handlePlaceOrder = () => {
    // 这里应该调用API提交订单
    alert('订单提交成功！');
    clearCart();
    setCurrentStep(1);
  };

  if (items.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>购物车为空</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>快去挑选心仪的商品吧！</p>
          <Link href="/products">
            <button style={{
              padding: '15px 30px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              去购物
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 顶部进度条 */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: currentStep >= 1 ? '#667eea' : '#ccc'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: currentStep >= 1 ? '#667eea' : '#ccc',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <span>商品确认</span>
            </div>
            
            <div style={{
              width: '50px',
              height: '2px',
              backgroundColor: currentStep >= 2 ? '#667eea' : '#ccc'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: currentStep >= 2 ? '#667eea' : '#ccc'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: currentStep >= 2 ? '#667eea' : '#ccc',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <span>填写信息</span>
            </div>
            
            <div style={{
              width: '50px',
              height: '2px',
              backgroundColor: currentStep >= 3 ? '#667eea' : '#ccc'
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: currentStep >= 3 ? '#667eea' : '#ccc'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: currentStep >= 3 ? '#667eea' : '#ccc',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <span>支付下单</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* 左侧：主要内容 */}
          <div>
            {currentStep === 1 && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px' }}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>商品确认</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {items.map((item) => (
                    <div key={item.product._id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '20px',
                      border: '1px solid #eee',
                      borderRadius: '10px'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem'
                      }}>
                        {item.product.category === 'clothing' ? '👕' : '📱'}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.product.name}</h3>
                        <p style={{ margin: 0, color: '#666' }}>{item.product.description}</p>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                            style={{
                              width: '30px',
                              height: '30px',
                              border: '1px solid #ddd',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            style={{
                              width: '30px',
                              height: '30px',
                              border: '1px solid #ddd',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                        
                        <span style={{ fontWeight: 'bold', color: '#667eea', minWidth: '80px' }}>
                          ¥{(item.product.price || 0) * item.quantity}
                        </span>
                        
                        <button
                          onClick={() => removeItem(item.product._id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px' }}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>收货信息</h2>
                
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>收货人姓名</label>
                      <input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>联系电话</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>详细地址</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>城市</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>邮编</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px' }}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>支付方式</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    border: paymentMethod === 'alipay' ? '2px solid #667eea' : '1px solid #ddd',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="alipay"
                      checked={paymentMethod === 'alipay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span style={{ fontSize: '1.5rem' }}>💰</span>
                    <span>支付宝</span>
                  </label>
                  
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    border: paymentMethod === 'wechat' ? '2px solid #667eea' : '1px solid #ddd',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="wechat"
                      checked={paymentMethod === 'wechat'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span style={{ fontSize: '1.5rem' }}>💬</span>
                    <span>微信支付</span>
                  </label>
                  
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    border: paymentMethod === 'card' ? '2px solid #667eea' : '1px solid #ddd',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span style={{ fontSize: '1.5rem' }}>💳</span>
                    <span>银行卡</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：订单摘要 */}
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>订单摘要</h3>
            
            <div style={{ marginBottom: '20px' }}>
              {items.map((item) => (
                <div key={item.product._id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '0.9rem'
                }}>
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>¥{(item.product.price || 0) * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span>商品小计</span>
                <span>¥{subtotal}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span>运费</span>
                <span>{shipping === 0 ? '免运费' : `¥${shipping}`}</span>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#667eea',
                borderTop: '1px solid #eee',
                paddingTop: '15px'
              }}>
                <span>总计</span>
                <span>¥{total}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  上一步
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  style={{
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  立即下单
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 