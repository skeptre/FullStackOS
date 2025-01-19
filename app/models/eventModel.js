const db = require('../../database.js');

// Create event
const createEvent = (eventData, callback) => {
    const { name, description, location, start_date, close_registration, max_attendees, creator_id } = eventData;
    db.run(
        `INSERT INTO events (name, description, location, start_date, close_registration, max_attendees, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, location, start_date, close_registration, max_attendees, creator_id],
        function (err) {
            callback(err, this ? this.lastID : null);
        }
    );
};

// Get event by ID
const getEventById = (eventId, callback) => {
    db.get(`SELECT * FROM events WHERE event_id = ?`, [eventId], callback);
};

// Update event
const updateEvent = (eventId, eventData, callback) => {
    const { name, description, location, start_date, close_registration, max_attendees } = eventData;
    db.run(
        `UPDATE events SET name = ?, description = ?, location = ?, start_date = ?, close_registration = ?, max_attendees = ? WHERE event_id = ?`,
        [name, description, location, start_date, close_registration, max_attendees, eventId],
        function (err) {
            callback(err, this.changes);
        }
    );
};

// Delete event
const deleteEvent = (eventId, callback) => {
    db.run(`DELETE FROM events WHERE event_id = ?`, [eventId], function (err) {
        callback(err, this.changes);
    });
};

module.exports = {
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent,
};
