const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Event routes
router.post('/', authMiddleware, eventController.createEvent); // Create event
router.put('/:id', authMiddleware, eventController.updateEvent); // Update event
router.delete('/:id', authMiddleware, eventController.deleteEvent); // Delete event
router.get('/:id', authMiddleware, eventController.getEvent); // Get event details

module.exports = router;
