// express-server/src/data/mockData.js

const mockUsers = [
    {
      _id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
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
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
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
      description: '高品质纯棉T恤，舒适透气，适合日常穿着',
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
        { name: '黑色', hexCode: '#000000' },
        { name: '蓝色', hexCode: '#3B82F6' }
      ],
      inStock: true,
      rating: {
        average: 4.5,
        count: 120
      },
      tags: ['纯棉', '舒适', '百搭']
    },
    {
      _id: '102',
      name: '休闲裤',
      description: '舒适休闲裤，适合日常穿着，版型修身',
      price: 499,
      originalPrice: 599,
      category: 'clothing',
      subcategory: 'pants',
      brand: 'CasualWear',
      images: [
        {
          url: '/images/pants-1.jpg',
          altText: '休闲裤'
        }
      ],
      sizes: [
        { size: '30', quantity: 8 },
        { size: '32', quantity: 12 },
        { size: '34', quantity: 10 }
      ],
      measurements: {
        waist: 80,
        length: 100,
        hip: 95
      },
      colors: [
        { name: '深蓝', hexCode: '#1E3A8A' },
        { name: '灰色', hexCode: '#6B7280' }
      ],
      inStock: true,
      rating: {
        average: 4.3,
        count: 85
      },
      tags: ['休闲', '修身', '舒适']
    },
    {
      _id: '103',
      name: '智能手机',
      description: '最新款智能手机，高性能处理器，超长续航',
      price: 3999,
      originalPrice: 4599,
      category: 'electronics',
      subcategory: 'phones',
      brand: 'TechCorp',
      images: [
        {
          url: '/images/phone-1.jpg',
          altText: '智能手机'
        }
      ],
      specifications: {
        screen: '6.1英寸',
        storage: '128GB',
        color: '黑色',
        battery: '4000mAh'
      },
      inStock: true,
      rating: {
        average: 4.7,
        count: 256
      },
      tags: ['智能手机', '高性能', '长续航']
    },
    {
      _id: '104',
      name: '无线耳机',
      description: '高品质无线蓝牙耳机，降噪功能，音质清晰',
      price: 899,
      originalPrice: 1299,
      category: 'electronics',
      subcategory: 'audio',
      brand: 'SoundTech',
      images: [
        {
          url: '/images/headphones-1.jpg',
          altText: '无线耳机'
        }
      ],
      specifications: {
        type: '入耳式',
        battery: '6小时',
        connectivity: '蓝牙5.0',
        features: ['降噪', '防水']
      },
      inStock: true,
      rating: {
        average: 4.6,
        count: 189
      },
      tags: ['无线', '降噪', '蓝牙']
    },
    {
      _id: '105',
      name: '现代沙发',
      description: '简约现代风格沙发，舒适耐用，适合客厅',
      price: 2999,
      originalPrice: 3599,
      category: 'furniture',
      subcategory: 'sofas',
      brand: 'HomeStyle',
      images: [
        {
          url: '/images/sofa-1.jpg',
          altText: '现代沙发'
        }
      ],
      specifications: {
        material: '布艺',
        dimensions: '200x80x85cm',
        seats: 3,
        color: '灰色'
      },
      inStock: true,
      rating: {
        average: 4.4,
        count: 67
      },
      tags: ['现代', '舒适', '客厅']
    },
    {
      _id: '106',
      name: '办公桌',
      description: '实木办公桌，简约设计，适合居家办公',
      price: 1299,
      originalPrice: 1599,
      category: 'furniture',
      subcategory: 'desks',
      brand: 'WorkSpace',
      images: [
        {
          url: '/images/desk-1.jpg',
          altText: '办公桌'
        }
      ],
      specifications: {
        material: '实木',
        dimensions: '120x60x75cm',
        weight: '25kg',
        color: '原木色'
      },
      inStock: true,
      rating: {
        average: 4.5,
        count: 92
      },
      tags: ['实木', '办公', '简约']
    },
    {
      _id: '107',
      name: '运动鞋',
      description: '专业运动鞋，轻便透气，适合跑步健身',
      price: 699,
      originalPrice: 899,
      category: 'clothing',
      subcategory: 'shoes',
      brand: 'SportMax',
      images: [
        {
          url: '/images/shoes-1.jpg',
          altText: '运动鞋'
        }
      ],
      sizes: [
        { size: '39', quantity: 15 },
        { size: '40', quantity: 20 },
        { size: '41', quantity: 18 },
        { size: '42', quantity: 12 }
      ],
      colors: [
        { name: '白色', hexCode: '#FFFFFF' },
        { name: '黑色', hexCode: '#000000' },
        { name: '红色', hexCode: '#EF4444' }
      ],
      inStock: true,
      rating: {
        average: 4.6,
        count: 145
      },
      tags: ['运动', '轻便', '透气']
    },
    {
      _id: '108',
      name: '笔记本电脑',
      description: '轻薄笔记本电脑，高性能处理器，适合办公学习',
      price: 5999,
      originalPrice: 6999,
      category: 'electronics',
      subcategory: 'laptops',
      brand: 'TechCorp',
      images: [
        {
          url: '/images/laptop-1.jpg',
          altText: '笔记本电脑'
        }
      ],
      specifications: {
        screen: '14英寸',
        processor: 'Intel i5',
        memory: '8GB',
        storage: '512GB SSD',
        weight: '1.5kg'
      },
      inStock: true,
      rating: {
        average: 4.8,
        count: 203
      },
      tags: ['轻薄', '高性能', '办公']
    },
    {
      _id: '109',
      name: '连衣裙',
      description: '优雅连衣裙，适合各种场合，版型修身',
      price: 899,
      originalPrice: 1199,
      category: 'clothing',
      subcategory: 'dresses',
      brand: 'ElegantStyle',
      images: [
        {
          url: '/images/dress-1.jpg',
          altText: '连衣裙'
        }
      ],
      sizes: [
        { size: 'XS', quantity: 8 },
        { size: 'S', quantity: 12 },
        { size: 'M', quantity: 15 },
        { size: 'L', quantity: 10 }
      ],
      colors: [
        { name: '红色', hexCode: '#EF4444' },
        { name: '蓝色', hexCode: '#3B82F6' },
        { name: '黑色', hexCode: '#000000' }
      ],
      inStock: true,
      rating: {
        average: 4.4,
        count: 78
      },
      tags: ['优雅', '修身', '百搭']
    },
    {
      _id: '110',
      name: '书架',
      description: '多层书架，实木材质，适合收纳书籍和装饰品',
      price: 799,
      originalPrice: 999,
      category: 'furniture',
      subcategory: 'shelves',
      brand: 'HomeStyle',
      images: [
        {
          url: '/images/bookshelf-1.jpg',
          altText: '书架'
        }
      ],
      specifications: {
        material: '实木',
        dimensions: '80x30x180cm',
        shelves: 5,
        color: '原木色'
      },
      inStock: true,
      rating: {
        average: 4.3,
        count: 56
      },
      tags: ['实木', '收纳', '多层']
    }
  ];
  
  module.exports = {
    mockUsers,
    mockProducts
  };