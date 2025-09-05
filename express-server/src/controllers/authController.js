// express-server/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockService = require('../services/mockService');

const getJwtSecret = () => process.env.JWT_SECRET || 'dev_secret_key_change_me';

const sanitizeUser = (user) => {
  if (!user) return null;
  const rest = { ...user };
  delete rest.password;
  return rest;
};

const authController = {
  register: (req, res) => {
    try {
      const { email, username, password } = req.body || {};
      if (!email || !username || !password) {
        return res.status(400).json({ message: '缺少必要字段（email、username、password）' });
      }

      const existing = mockService.findUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: '邮箱已被注册' });
      }

      const hashed = bcrypt.hashSync(password, 10);
      const newUser = mockService.createUser({ email, username, password: hashed });
      const token = jwt.sign({ userId: newUser._id }, getJwtSecret(), { expiresIn: '7d' });

      return res.status(201).json({ token, user: sanitizeUser(newUser) });
    } catch (error) {
      return res.status(500).json({ message: '服务器错误', error: error.message });
    }
  },

  login: (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ message: '缺少必要字段（email、password）' });
      }

      const user = mockService.findUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: '邮箱或密码不正确' });
      }

      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) {
        return res.status(401).json({ message: '邮箱或密码不正确' });
      }

      const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: '7d' });
      return res.json({ token, user: sanitizeUser(user) });
    } catch (error) {
      return res.status(500).json({ message: '服务器错误', error: error.message });
    }
  }
};

module.exports = authController;

