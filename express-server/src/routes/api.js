// express-server/src/routes/api.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// 健康检查
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'API服务正常运行'
  });
});

// 公开路由（无需认证）
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// 产品相关路由（公开）
router.get('/products', productController.getAllProducts);
router.get('/products/search', productController.searchProducts);
router.get('/products/:id', productController.getProductById);

// 需要认证的路由
router.use('/users', authMiddleware.verifyToken);
router.get('/users/:id', userController.getUserProfile);
router.put('/users/:id', authMiddleware.requireOwnerOrAdmin, userController.updateUserProfile);

// 用户当前信息
router.get('/me', authMiddleware.verifyToken, (req, res) => {
  res.json({
    message: '获取当前用户信息成功',
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
      bio: req.user.bio,
      createdAt: req.user.createdAt,
      lastLoginAt: req.user.lastLoginAt
    }
  });
});

// 刷新token
router.post('/auth/refresh', authMiddleware.verifyToken, (req, res) => {
  const jwt = require('jsonwebtoken');
  const getJwtSecret = () => process.env.JWT_SECRET || 'dev_secret_key_change_me';
  
  const newToken = jwt.sign({ userId: req.userId }, getJwtSecret(), { expiresIn: '7d' });
  
  res.json({
    message: 'Token刷新成功',
    token: newToken
  });
});

// 登出
router.post('/auth/logout', authMiddleware.verifyToken, (req, res) => {
  // 在实际应用中，可以将token加入黑名单
  res.json({ message: '登出成功' });
});

module.exports = router;