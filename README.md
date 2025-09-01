# 🚀 AR/VR 电商平台

一个基于 Next.js 和 Express.js 构建的现代化电商平台，集成了 AR/VR 试穿功能、3D 产品展示和完整的用户管理系统。

## ✨ 主要特性

### 🛍️ 电商核心功能
- **产品展示**: 支持产品列表、详情页、搜索和分类
- **购物车系统**: 完整的购物车管理功能
- **用户管理**: 注册、登录、个人资料管理
- **收藏夹**: 用户收藏产品功能
- **订单管理**: 结账流程和订单处理

### 🥽 AR/VR 创新功能
- **AR 试穿**: 基于 WebXR 的增强现实试穿体验
- **3D 产品展示**: 使用 Three.js 的 3D 产品查看器
- **虚拟试衣间**: 沉浸式购物体验
- **实时预览**: 实时 3D 渲染和交互

### 🎨 用户体验
- **响应式设计**: 适配各种设备尺寸
- **现代化 UI**: 美观的用户界面设计
- **密码强度检测**: 实时密码强度评估
- **表单验证**: 完整的客户端和服务器端验证
- **错误处理**: 友好的错误提示和处理

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 15.5.2**: React 全栈框架，支持 SSR/SSG
- **React 19.1.0**: 最新的 React 版本
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Three.js**: 3D 图形库
- **React Three Fiber**: React 的 Three.js 渲染器
- **WebXR**: 增强现实和虚拟现实 API

### 后端技术栈
- **Express.js 5.1.0**: Node.js Web 应用框架
- **MongoDB**: NoSQL 数据库
- **Mongoose**: MongoDB 对象建模工具
- **JWT**: JSON Web Token 身份验证
- **bcryptjs**: 密码加密
- **CORS**: 跨域资源共享

### 开发工具
- **ESLint**: 代码质量检查
- **Turbopack**: 快速构建工具
- **Nodemon**: 开发环境自动重启

## 📁 项目结构

```
xr/
├── src/                          # 前端源代码
│   ├── app/                      # Next.js App Router
│   │   ├── ar-tryon/            # AR 试穿页面
│   │   ├── cart/                # 购物车页面
│   │   ├── checkout/            # 结账页面
│   │   ├── dashboard/           # 用户仪表板
│   │   ├── favorites/           # 收藏夹页面
│   │   ├── login/               # 登录页面
│   │   ├── products/            # 产品页面
│   │   ├── profile/             # 用户资料页面
│   │   └── register/            # 注册页面
│   ├── components/              # React 组件
│   │   ├── AvatarUpload.tsx     # 头像上传组件
│   │   ├── Navigation.tsx       # 导航组件
│   │   ├── PasswordChange.tsx   # 密码修改组件
│   │   ├── Product3DViewer.tsx  # 3D 产品查看器
│   │   ├── ProductARViewer.tsx  # AR 产品查看器
│   │   └── ProtectedRoute.tsx   # 路由保护组件
│   ├── lib/                     # 工具库
│   │   ├── api.ts              # API 调用函数
│   │   ├── products.ts         # 产品相关 API
│   │   └── users.ts            # 用户相关 API
│   └── store/                   # 状态管理
│       ├── auth.ts             # 认证状态
│       ├── cart.ts             # 购物车状态
│       └── favorites.ts        # 收藏夹状态
├── express-server/              # 后端服务器
│   ├── src/
│   │   ├── controllers/        # 控制器
│   │   ├── data/              # 模拟数据
│   │   ├── middleware/        # 中间件
│   │   ├── routes/            # 路由
│   │   └── services/          # 服务层
│   └── server.js              # 服务器入口
├── public/                     # 静态资源
└── package.json               # 项目配置
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- MongoDB (可选，项目包含模拟数据)

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd express-server
npm install
cd ..
```

### 启动开发服务器

```bash
# 启动前端开发服务器 (端口 3000)
npm run dev

# 启动后端服务器 (端口 3001)
npm run server:dev

# 或者同时启动两个服务器
npm run dev & npm run server:dev
```

### 构建生产版本

```bash
# 构建前端
npm run build

# 启动生产服务器
npm run start
```

## 📱 功能页面

### 用户认证
- **注册页面** (`/register`): 用户注册，包含密码强度检测
- **登录页面** (`/login`): 用户登录，支持记住登录状态
- **个人资料** (`/profile`): 用户信息管理和头像上传

### 产品浏览
- **产品列表** (`/products`): 产品展示和搜索
- **产品详情** (`/products/[id]`): 产品详细信息
- **3D 查看器**: 交互式 3D 产品展示
- **AR 试穿** (`/ar-tryon`): 增强现实试穿体验

### 购物功能
- **购物车** (`/cart`): 购物车管理
- **收藏夹** (`/favorites`): 收藏产品管理
- **结账** (`/checkout`): 订单确认和支付

### 用户中心
- **仪表板** (`/dashboard`): 用户概览和订单历史
- **密码修改**: 安全的密码更新功能

## 🔧 API 接口

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/verify` - 验证 Token

### 产品接口
- `GET /api/products` - 获取产品列表
- `GET /api/products/:id` - 获取产品详情
- `GET /api/products/search` - 搜索产品

### 用户接口
- `GET /api/users/:id` - 获取用户信息
- `PUT /api/users/:id` - 更新用户信息

### 购物车接口
- `GET /api/cart` - 获取购物车
- `POST /api/cart/add` - 添加商品到购物车
- `DELETE /api/cart/remove` - 从购物车移除商品

## 🎮 AR/VR 功能详解

### AR 试穿系统
- 基于 WebXR API 实现
- 支持设备摄像头实时预览
- 虚拟商品叠加显示
- 手势识别和交互

### 3D 产品展示
- Three.js 渲染引擎
- 支持模型旋转、缩放、平移
- 材质和光照效果
- 响应式 3D 场景

### 技术实现
```typescript
// AR 查看器组件示例
import { ARButton, XR, Interactive } from '@react-three/xr'

function ProductARViewer() {
  return (
    <XR>
      <ARButton />
      <Interactive>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Interactive>
    </XR>
  )
}
```

## 🔒 安全特性

- **JWT 认证**: 安全的用户身份验证
- **密码加密**: bcryptjs 密码哈希
- **CORS 配置**: 跨域请求安全控制
- **输入验证**: 客户端和服务器端双重验证
- **路由保护**: 受保护页面的访问控制

## 🎨 UI/UX 设计

### 设计原则
- **现代化**: 简洁美观的界面设计
- **响应式**: 适配各种设备尺寸
- **无障碍**: 支持键盘导航和屏幕阅读器
- **性能优化**: 快速加载和流畅交互

### 组件库
- 自定义组件系统
- 一致的视觉风格
- 可复用的 UI 组件
- 动画和过渡效果

## 🚀 部署

### 前端部署
```bash
# Vercel 部署
npm run build
vercel --prod

# 其他平台
npm run build
# 将 .next 文件夹部署到服务器
```

### 后端部署
```bash
# 环境变量配置
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# 启动服务器
npm start
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目链接: [https://github.com/your-username/xr-ecommerce](https://github.com/your-username/xr-ecommerce)
- 问题反馈: [Issues](https://github.com/your-username/xr-ecommerce/issues)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Three.js](https://threejs.org/) - 3D 图形库
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React 的 Three.js 渲染器
- [Express.js](https://expressjs.com/) - Node.js Web 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
