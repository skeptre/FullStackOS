const express = require('express');
const {
    registerForEvent,
    unregisterFromEvent,
} = require('../controllers/attendanceController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register for an event
router.post('/:event_id/register', authMiddleware, registerForEvent);

// Unregister from an event
router.delete('/:event_id/register', authMiddleware, unregisterFromEvent);

module.exports = router;
