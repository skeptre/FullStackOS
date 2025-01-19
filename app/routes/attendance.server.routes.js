const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

// Attendance routes
router.post('/:eventId', authMiddleware, attendanceController.registerAttendance);

module.exports = router;
