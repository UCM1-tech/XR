// express-server/src/data/mockData.js

const mockUsers = [
    {
      _id: '1',
      username: 'testuser',
      email: 'test@example.com',
      phone: '13800138000',
      avatar: '',
      bio: '热爱时尚的购物达人',
      createdAt: '2024-01-01T00:00:00.000Z',
      lastLoginAt: '2024-12-01T10:30:00.000Z',
      profile: {
        firstName: 'Test',
        lastName: 'User',
        bodyMeasurements: {
          height: 175,
          weight: 70,
          chest: 95,
          waist: 80,
          hips: 95
        }
      },
      preferences: {
        sizeSystem: 'US'
      }
    },
    {
      _id: '2',
      username: 'fashionlover',
      email: 'fashion@example.com',
      phone: '13900139000',
      avatar: '',
      bio: '专业时尚博主，分享最新潮流资讯',
      createdAt: '2024-02-01T00:00:00.000Z',
      lastLoginAt: '2024-12-01T15:45:00.000Z',
      profile: {
        firstName: 'Fashion',
        lastName: 'Lover',
        bodyMeasurements: {
          height: 165,
          weight: 55,
          chest: 85,
          waist: 65,
          hips: 90
        }
      },
      preferences: {
        sizeSystem: 'EU'
      }
    }
  ];
  
  const mockProducts = [
    {
      _id: '101',
      name: '时尚T恤',
      description: '高品质纯棉T恤，舒适透气',
      price: 299,
      originalPrice: 399,
      category: 'clothing',
      subcategory: 'shirts',
      brand: 'FashionBrand',
      images: [
        {
          url: '/images/tshirt-1.jpg',
          altText: '时尚T恤'
        }
      ],
      sizes: [
        { size: 'S', quantity: 10 },
        { size: 'M', quantity: 15 },
        { size: 'L', quantity: 8 }
      ],
      measurements: {
        chest: 100,
        waist: 90,
        length: 70
      },
      colors: [
        { name: '白色', hexCode: '#FFFFFF' },
        { name: '黑色', hexCode: '#000000' }
      ],
      inStock: true,
      rating: {
        average: 4.5,
        count: 120
      }
    },
    {
      _id: '102',
      name: '休闲裤',
      description: '舒适休闲裤，适合日常穿着',
      price: 499,
      category: 'clothing',
      subcategory: 'pants',
      brand: 'CasualWear',
      // ...更多产品数据
    }
  ];
  
  module.exports = {
    mockUsers,
    mockProducts
  };