const express = require('express');
const {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create an event
router.post('/', authMiddleware, createEvent);

// Get event details
router.get('/:id', authMiddleware, getEvent);

// Update an event
router.patch('/:id', authMiddleware, updateEvent);

// Delete an event
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
