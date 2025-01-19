const { searchEvents } = require('../models/searchModel');
const Joi = require('joi');

const searchSchema = Joi.object({
    query: Joi.string().optional(),
    status: Joi.string().valid('OPEN', 'ARCHIVE', 'MY_EVENTS', 'ATTENDING').optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional(),
});

exports.search = async (req, res) => {
    const { error, value } = searchSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error_message: error.details[0].message });
    }

    try {
        const results = await searchEvents(value);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error_message: 'Database error', error: err.message });
    }
};
