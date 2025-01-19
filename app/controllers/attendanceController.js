const { registerForEvent } = require('../models/attendanceModel');

exports.registerAttendance = (req, res) => {
    registerForEvent(req.params.eventId, req.user.user_id, (err) => {
        if (err) return res.status(400).json({ error_message: 'Unable to register for event' });
        res.status(200).json({ message: 'Registered successfully' });
    });
};
