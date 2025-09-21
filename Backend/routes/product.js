const express = require('express');
const { 
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  likeProduct
} = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/:id', optionalAuth, getProduct);

// Protected routes
router.post('/', authenticateToken, validateProduct, createProduct);
router.put('/:id', authenticateToken, validateProduct, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);
router.post('/:id/like', authenticateToken, likeProduct);

module.exports = router;