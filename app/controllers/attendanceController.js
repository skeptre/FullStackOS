const { registerForEvent, unregisterFromEvent, isUserRegistered } = require('../models/attendanceModel');
const Joi = require('joi');

// Validation schema for event and user IDs
const eventUserSchema = Joi.object({
    event_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
});

// Register for an event
exports.registerForEvent = (req, res) => {
    const eventId = parseInt(req.params.event_id);
    const userId = req.user.user_id;

    const { error } = eventUserSchema.validate({ event_id: eventId, user_id: userId });
    if (error) {
        return res.status(400).json({ success: false, error_message: error.details[0].message });
    }

    isUserRegistered(eventId, userId, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error_message: 'Database error' });
        }
        if (result) {
            return res.status(400).json({ success: false, error_message: 'User already registered' });
        }

        registerForEvent(eventId, userId, (err, registrationId) => {
            if (err) {
                return res.status(500).json({ success: false, error_message: 'Database error during registration' });
            }
            res.status(201).json({
                success: true,
                registration_id: registrationId,
                message: 'Successfully registered for the event',
            });
        });
    });
};

// Unregister from an event
exports.unregisterFromEvent = (req, res) => {
    const eventId = parseInt(req.params.event_id);
    const userId = req.user.user_id;

    const { error } = eventUserSchema.validate({ event_id: eventId, user_id: userId });
    if (error) {
        return res.status(400).json({ success: false, error_message: error.details[0].message });
    }

    unregisterFromEvent(eventId, userId, (err, changes) => {
        if (err) {
            return res.status(500).json({ success: false, error_message: 'Database error' });
        }
        if (changes === 0) {
            return res.status(400).json({ success: false, error_message: 'Not registered for this event' });
        }
        res.status(200).json({ success: true, message: 'Successfully unregistered from the event' });
    });
};
