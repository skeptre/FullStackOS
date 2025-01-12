const Joi = require('joi');
const {
    addQuestion: addQuestionModel,
    deleteQuestion: deleteQuestionModel,
    upvoteQuestion: upvoteQuestionModel,
    downvoteQuestion: downvoteQuestionModel,
} = require('../models/questionModel');

// Validation schema for adding a question
const questionSchema = Joi.object({
    question: Joi.string().required(),
});

// Add a question
exports.addQuestion = (req, res) => {
    const { error, value } = questionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error_message: error.details[0].message });
    }

    const eventId = req.params.event_id;
    const userId = req.user ? req.user.user_id : null;

    if (!userId) {
        return res.status(401).json({ error_message: 'Unauthorized user' });
    }

    addQuestionModel({ event_id: eventId, question: value.question, asked_by: userId }, (err, questionId) => {
        if (err) {
            return res.status(500).json({ error_message: 'Database error while adding question' });
        }
        res.status(201).json({ question_id: questionId });
    });
};

// Delete a question
exports.deleteQuestion = (req, res) => {
    const questionId = req.params.question_id;

    deleteQuestionModel(questionId, (err, changes) => {
        if (err) {
            return res.status(500).json({ error_message: 'Database error' });
        }
        if (changes === 0) {
            return res.status(404).json({ error_message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    });
};

// Upvote a question
exports.upvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user ? req.user.user_id : null;

    if (!userId) {
        return res.status(401).json({ error_message: 'Unauthorized user' });
    }

    upvoteQuestionModel(questionId, userId, (err) => {
        if (err) {
            return res.status(400).json({ error_message: 'Already voted on this question' });
        }
        res.status(200).json({ message: 'Upvoted successfully' });
    });
};

// Downvote a question
exports.downvoteQuestion = (req, res) => {
    const questionId = req.params.question_id;
    const userId = req.user ? req.user.user_id : null;

    if (!userId) {
        return res.status(401).json({ error_message: 'Unauthorized user' });
    }

    downvoteQuestionModel(questionId, userId, (err, changes) => {
        if (err) {
            return res.status(500).json({ error_message: 'Database error' });
        }
        if (changes === 0) {
            return res.status(400).json({ error_message: 'You have not voted on this question' });
        }
        res.status(200).json({ message: 'Downvoted successfully' });
    });
};