const express = require('express');
const questionController = require('../controllers/questionController.js');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a question to an event
router.post('/event/:event_id/question', authMiddleware, questionController.addQuestion);

// Delete a question
router.delete('/question/:question_id', authMiddleware, questionController.deleteQuestion);

// Upvote a question
router.post('/question/:question_id/vote', authMiddleware, questionController.upvoteQuestion);

// Downvote a question
router.delete('/question/:question_id/vote', authMiddleware, questionController.downvoteQuestion);

module.exports = router;
