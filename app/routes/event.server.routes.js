const express = require('express');
const { createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController.js');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/events', middleware, createEvent);
router.get('/events/:id', middleware, getEvent);
router.patch('/events/:id', middleware, updateEvent);
router.delete('/events/:id', middleware, deleteEvent);

module.exports = router;
