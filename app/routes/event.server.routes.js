const express = require('express');
const { createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController.js');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

// Define event-related routes
router.post('/events', middleware, createEvent); // Create an event
router.get('/events/:id', middleware, getEvent); // Get event details
router.patch('/events/:id', middleware,updateEvent); // Update an event
router.delete('/events/:id', middleware, deleteEvent); // Archive/delete an event

module.exports = router;