const db = require('../../database.js'); // Import database connection

// Register a user for an event
const registerForEvent = (eventId, userId, callback) => {
    db.run(
        `INSERT INTO attendees (event_id, user_id) VALUES (?, ?)`,
        [eventId, userId],
        function (err) {
            callback(err, this ? this.lastID : null); // Return the registration ID
        }
    );
};

// Unregister a user from an event
const unregisterFromEvent = (eventId, userId, callback) => {
    db.run(
        `DELETE FROM attendees WHERE event_id = ? AND user_id = ?`,
        [eventId, userId],
        function (err) {
            callback(err, this.changes); // Return the number of rows affected
        }
    );
};

// Check if a user is already registered for an event
const isUserRegistered = (eventId, userId, callback) => {
    db.get(
        `SELECT * FROM attendees WHERE event_id = ? AND user_id = ?`,
        [eventId, userId],
        callback
    );
};

module.exports = {
    registerForEvent,
    unregisterFromEvent,
    isUserRegistered,
};