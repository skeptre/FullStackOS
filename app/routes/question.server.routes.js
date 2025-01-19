const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const questionController = require('../controllers/questionController');

const router = express.Router();

// Question routes
router.post('/:eventId', authMiddleware, questionController.addQuestion);
router.delete('/:id', authMiddleware, questionController.deleteQuestion);

module.exports = router;
