// express-server/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const mockService = require('../services/mockService');

const getJwtSecret = () => process.env.JWT_SECRET || 'dev_secret_key_change_me';

const authMiddleware = {
  // 验证JWT token
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: '缺少认证token' });
      }

      const token = authHeader.substring(7); // 移除 'Bearer ' 前缀
      
      jwt.verify(token, getJwtSecret(), (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token已过期，请重新登录' });
          }
          return res.status(401).json({ message: '无效的token' });
        }

        // 验证用户是否存在
        const user = mockService.findUserById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: '用户不存在' });
        }

        // 将用户信息添加到请求对象
        req.user = user;
        req.userId = decoded.userId;
        next();
      });
    } catch (error) {
      console.error('Token验证错误:', error);
      return res.status(500).json({ message: '服务器错误' });
    }
  },

  // 可选的token验证（不强制要求登录）
  optionalAuth: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(); // 继续执行，但不设置用户信息
      }

      const token = authHeader.substring(7);
      
      jwt.verify(token, getJwtSecret(), (err, decoded) => {
        if (err) {
          return next(); // token无效，但不阻止请求
        }

        const user = mockService.findUserById(decoded.userId);
        if (user) {
          req.user = user;
          req.userId = decoded.userId;
        }
        next();
      });
    } catch (error) {
      console.error('可选认证错误:', error);
      next(); // 出错时继续执行
    }
  },

  // 检查用户权限（管理员）
  requireAdmin: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '需要登录' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: '需要管理员权限' });
    }

    next();
  },

  // 检查用户是否为资源所有者或管理员
  requireOwnerOrAdmin: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '需要登录' });
    }

    const resourceUserId = req.params.userId || req.body.userId;
    
    if (req.user.role === 'admin' || req.user._id === resourceUserId) {
      return next();
    }

    return res.status(403).json({ message: '权限不足' });
  }
};

module.exports = authMiddleware; 