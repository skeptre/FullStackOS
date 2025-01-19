const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/userController.js');

const router = express.Router();

// Register a new user
router.post('/users', createUser);

// Login a user
router.post('/login', loginUser);

// Logout a user
router.post('/logout', logoutUser);

module.exports = router;
