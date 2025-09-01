// 加载环境变量
require('dotenv').config();

// 导入模块
const express = require('express');
const cors = require('cors');

// 创建 Express 应用
const app = express();

// 定义端口号
const PORT = process.env.PORT || 3001;

// 中间件：解析 JSON 请求体
app.use(express.json());
// 中间件：启用 CORS（允许跨域请求）
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'],
  credentials: true
}));

// 导入API路由
const apiRoutes = require('./src/routes/api');

// 挂载API路由
app.use('/api', apiRoutes);

// 基本路由：/api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: '服务器运行正常',
    timestamp: new Date().toISOString()
  });
});

// 根路由
app.get('/', (req, res) => {
  res.json({ 
    message: '欢迎使用 Express 服务器',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/products/search',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/users/:id',
      'PUT /api/users/:id'
    ]
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`健康检查接口: http://localhost:${PORT}/api/health`);
});

// 导出 app（用于测试或其他模块）
module.exports = app;