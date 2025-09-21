const express = require('express');
const { 
  generateStory,
  generateSocialMedia,
  analyzePricing,
  enhancePhotos,
  translateContent,
  getMarketTrends
} = require('../controllers/aiController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All AI routes require authentication
router.post('/story', authenticateToken, generateStory);
router.post('/social-media', authenticateToken, generateSocialMedia);
router.post('/pricing', authenticateToken, analyzePricing);
router.post('/enhance-photos', authenticateToken, enhancePhotos);
router.post('/translate', authenticateToken, translateContent);
router.get('/market-trends', authenticateToken, getMarketTrends);

module.exports = router;