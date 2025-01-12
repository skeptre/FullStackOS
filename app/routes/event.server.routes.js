const express = require('express');
const { createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController.js');

const router = express.Router();

// Define event-related routes
router.post('/events', createEvent); // Create an event
router.get('/events/:id', getEvent); // Get event details
router.patch('/events/:id', updateEvent); // Update an event
router.delete('/events/:id', deleteEvent); // Archive/delete an event

module.exports = router;