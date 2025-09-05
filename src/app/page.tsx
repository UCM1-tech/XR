import Link from 'next/link';
import { getLocaleFromCookies, getMessagesForLocale } from '@/i18n/server';

export default function HomePage() {
  const locale = getLocaleFromCookies();
  const messages = getMessagesForLocale(locale);
  return (
    <div>
      {/* 主视觉 Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '20px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            {messages.home.heroTitle}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '40px',
            opacity: 0.9,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {messages.home.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products">
              <button style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                backgroundColor: '#fff',
                color: '#667eea',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s'
              }}>
                {messages.home.ctaTryNow}
              </button>
            </Link>
            <Link href="/products">
              <button style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}>
                {messages.home.ctaLearnMore}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 功能特色区块 */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '60px',
            color: '#333'
          }}>
            {messages.home.whyChooseTitle}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🎮
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                {messages.home.feature3dTitle}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {messages.home.feature3dDesc}
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                👁️
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                {messages.home.featureArTitle}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {messages.home.featureArDesc}
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📱
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                {messages.home.featureAnywhereTitle}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {messages.home.featureAnywhereDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 热门商品推荐 */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '60px',
            color: '#333'
          }}>
            {messages.home.popularTitle}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {/* 商品卡片 1 */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                height: '200px', 
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                👕
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>时尚T恤</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>高品质纯棉，舒适透气</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>¥299</span>
                  <Link href="/products/101">
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}>
                      {messages.home.ctaTryNow}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* 商品卡片 2 */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                height: '200px', 
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                👖
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>休闲牛仔裤</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>经典款式，百搭实用</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>¥399</span>
                  <Link href="/products/102">
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}>
                      {messages.home.ctaTryNow}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* 商品卡片 3 */}
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ 
                height: '200px', 
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                👗
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>优雅连衣裙</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>精致设计，展现女性魅力</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>¥599</span>
                  <Link href="/products/103">
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}>
                      {messages.home.ctaTryNow}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/products">
              <button style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                {messages.home.viewMore}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 底部信息 */}
      <footer style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px',
            marginBottom: '30px'
          }}>
            <div>
              <h3 style={{ marginBottom: '15px' }}>{messages.home.footerAbout}</h3>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                XR
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '15px' }}>{messages.home.footerContact}</h3>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                邮箱：contact@xr-shopping.com<br />
                电话：400-123-4567<br />
                地址：北京市朝阳区科技园区
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: '15px' }}>{messages.home.footerLinks}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/products" style={{ color: '#ccc', textDecoration: 'none' }}>{messages.home.quickBrowse}</Link>
                <Link href="/login" style={{ color: '#ccc', textDecoration: 'none' }}>{messages.home.quickLogin}</Link>
                <Link href="/register" style={{ color: '#ccc', textDecoration: 'none' }}>{messages.home.quickRegister}</Link>
                <Link href="/cart" style={{ color: '#ccc', textDecoration: 'none' }}>{messages.home.quickCart}</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #555', paddingTop: '20px', color: '#ccc' }}>
            {messages.home.footerCopyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
