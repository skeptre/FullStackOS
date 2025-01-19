const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Event routes
router.post('/', authMiddleware, eventController.createEvent);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
