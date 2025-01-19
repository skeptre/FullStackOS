const express = require('express');
const { registerForEvent, unregisterFromEvent } = require('../controllers/attendanceController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/event/:event_id/register', authMiddleware, registerForEvent);
router.delete('/event/:event_id/register', authMiddleware, unregisterFromEvent);

module.exports = router;
