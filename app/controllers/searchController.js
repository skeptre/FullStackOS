const { searchEvents: searchEventsModel } = require('../models/searchModel'); // Import model function
const Joi = require('joi');

// Define validation schema for query parameters
const searchSchema = Joi.object({
    q: Joi.string().optional().allow(''), // Search query, optional
    status: Joi.string().valid('MY_EVENTS', 'ATTENDING', 'OPEN', 'ARCHIVE').optional(), // Status filter
    limit: Joi.number().integer().min(1).max(100).default(10), // Pagination limit
    offset: Joi.number().integer().min(0).default(0) // Pagination offset
});

exports.searchEvents = (req, res) => {
    const { error, value } = searchSchema.validate(req.query);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { q, status, limit, offset } = value;

    searchEventsModel({ q, status, limit, offset }, (err, rows) => {
        if (err) return res.status(500).json({ error_message: 'Database error' });
        res.status(200).json(rows);
    });
};