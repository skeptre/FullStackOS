const express = require('express');
const { createUser, loginUser } = require('../controllers/userController.js');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users', middleware, createUser); // Create a new user
router.post('/login', middleware, loginUser);  // Login a user

module.exports = router;