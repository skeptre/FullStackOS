const express = require('express');
const { registerForEvent, unregisterFromEvent } = require('../controllers/attendanceController.js'); // Import the controller functions
const authMiddleware = require('../middleware/authMiddleware.js'); // Import middleware

const router = express.Router();

// Define routes for event registration
router.post('/event/:event_id/register', authMiddleware, registerForEvent); // Register for an event
router.delete('/event/:event_id/register', authMiddleware, unregisterFromEvent); // Unregister from an event

module.exports = router; // Export the router