const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/userController.js');

const router = express.Router();

// Define routes for user-related operations
router.post('/users', createUser); // Create a new user
router.post('/login', loginUser);  // Login a user
router.post('/logout', logoutUser);


module.exports = router;
