const express = require('express');
const { 
  getArtisans,
  getArtisan,
  followArtisan,
  getFollowers,
  getFollowing
} = require('../controllers/artisanController');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getArtisans);
router.get('/:id', optionalAuth, getArtisan);
router.get('/:id/followers', optionalAuth, getFollowers);
router.get('/:id/following', optionalAuth, getFollowing);

// Protected routes
router.post('/:id/follow', authenticateToken, followArtisan);

module.exports = router;