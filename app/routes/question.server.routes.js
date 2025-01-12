const express = require('express');
const questionController = require('../controllers/questionController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/event/:event_id/question', authMiddleware, questionController.addQuestion); // Add a question
router.delete('/question/:question_id', authMiddleware, questionController.deleteQuestion); // Delete a question
router.post('/question/:question_id/vote', authMiddleware, questionController.upvoteQuestion); // Upvote a question
router.delete('/question/:question_id/vote', authMiddleware, questionController.downvoteQuestion); // Downvote a question

module.exports = router;