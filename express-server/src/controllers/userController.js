// express-server/src/controllers/userController.js
const mockService = require('../services/mockService');

const userController = {
  getUserProfile: (req, res) => {
    try {
      const user = mockService.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }
      
      // 返回用户资料，排除敏感信息
      const userCopy = { ...user };
      delete userCopy.password;
      res.json(userCopy);
    } catch (error) {
      console.error('获取用户资料失败:', error);
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  },

  updateUserProfile: (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      
      // 验证用户是否存在
      const user = mockService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }
      
      // 验证必填字段
      if (updateData.username && updateData.username.trim().length < 2) {
        return res.status(400).json({ message: '用户名至少需要2个字符' });
      }
      
      if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
        return res.status(400).json({ message: '邮箱格式不正确' });
      }
      
      // 验证手机号格式（如果提供）
      if (updateData.phone && !/^1[3-9]\d{9}$/.test(updateData.phone)) {
        return res.status(400).json({ message: '手机号格式不正确' });
      }
      
      // 只允许更新特定字段
      const allowedFields = ['username', 'email', 'phone', 'avatar', 'bio'];
      const filteredData = {};
      
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });
      
      // 更新用户资料
      Object.assign(user, filteredData);
      
      // 更新最后修改时间
      user.updatedAt = new Date().toISOString();
      
      // 返回更新后的用户资料（排除敏感信息）
      const userCopy2 = { ...user };
      delete userCopy2.password;
      res.json(userCopy2);
    } catch (error) {
      console.error('更新用户资料失败:', error);
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  }
};

module.exports = userController;