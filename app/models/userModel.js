const db = require('../../database.js'); // CommonJS import for database

// Create a new user
const createUser = (userData, callback) => {
    const { first_name, last_name, email, password } = userData;
    db.run(
        `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
        [first_name, last_name, email, password],
        function (err) {
            callback(err, this ? this.lastID : null);
        }
    );
};

// Get a user by email
const getUserByEmail = (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};

// Get a user by ID
const getUserById = (userId, callback) => {
    db.get(`SELECT * FROM users WHERE user_id = ?`, [userId], callback);
};

// Validate user credentials for login
const validateUserCredentials = (email, callback) => {
    db.get(`SELECT user_id, password FROM users WHERE email = ?`, [email], callback);
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    validateUserCredentials,
};