// express-server/src/routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

// 用户路由
router.get('/users/:id', userController.getUserProfile);
router.put('/users/:id', userController.updateUserProfile);

// 认证路由
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// 商品路由
router.get('/products', productController.getAllProducts);
router.get('/products/search', productController.searchProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;