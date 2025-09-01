// express-server/src/controllers/productController.js
const mockService = require('../services/mockService');

const productController = {
  getAllProducts: (req, res) => {
    try {
      const products = mockService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  },

  getProductById: (req, res) => {
    try {
      const product = mockService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: '商品不存在' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  },

  searchProducts: (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: '需要搜索关键词' });
      }
      const results = mockService.searchProducts(q);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: '服务器错误', error: error.message });
    }
  }
};

module.exports = productController;