const express = require('express');
const { 
  getDashboardStats,
  getAnalytics
} = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All dashboard routes require authentication
router.get('/stats', authenticateToken, getDashboardStats);
router.get('/analytics', authenticateToken, getAnalytics);

module.exports = router;