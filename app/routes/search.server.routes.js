const express = require('express');
const { searchEvents } = require('../controllers/searchController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Search for events
router.get('/search', authMiddleware, searchEvents);

module.exports = router;
