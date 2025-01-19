const { registerAttendance } = require('../models/attendanceModel');

exports.registerAttendance = async (req, res) => {
    try {
        await registerAttendance(req.params.eventId, req.user.user_id);
        res.status(200).json({ message: 'Attendance registered successfully' });
    } catch (err) {
        res.status(400).json({ error_message: err.message });
    }
};
