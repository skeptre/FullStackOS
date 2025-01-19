const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/users', userController.registerUser); // Register a new user
router.post('/users/login', userController.loginUser); // Login a user
router.post('/users/logout', authMiddleware, userController.logoutUser); // Logout a logged-in user

module.exports = router;
