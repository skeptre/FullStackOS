const express = require('express');
const { searchEvents } = require('../controllers/searchController.js'); // Import controller function

const router = express.Router();

router.get('/search', searchEvents); // Define search route

module.exports = router;