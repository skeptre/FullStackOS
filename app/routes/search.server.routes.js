const express = require('express');
const { searchEvents } = require('../controllers/searchController.js'); // Import controller function
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', middleware, searchEvents); // Define search route

module.exports = router;