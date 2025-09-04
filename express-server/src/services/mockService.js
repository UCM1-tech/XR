// express-server/src/services/mockService.js
const { mockUsers, mockProducts } = require('../data/mockData');

let users = [...mockUsers];
let products = [...mockProducts];
let nextUserId = 2;
let nextProductId = 103;

const mockService = {
  // 用户相关方法
  findUserById: (id) => users.find(user => user._id === id),
  findUserByEmail: (email) => users.find(user => user.email === email),
  createUser: (userData) => {
    const newUser = {
      _id: String(nextUserId++),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  // 商品相关方法
  getAllProducts: () => products,
  getProductById: (id) => products.find(product => product._id === id),
  createProduct: (productData) => {
    const newProduct = {
      _id: String(nextProductId++),
      ...productData,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: (id, updateData) => {
    const index = products.findIndex(p => p._id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updateData };
      return products[index];
    }
    return null;
  },

  // 搜索商品
  searchProducts: (query) => {
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};

module.exports = mockService;