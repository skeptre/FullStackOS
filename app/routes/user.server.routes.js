const express = require('express');
const { createUser, loginUser } = require('../controllers/userController.js');

const router = express.Router();

router.post('/users', createUser); // Create a new user
router.post('/login', loginUser);  // Login a user

module.exports = router;