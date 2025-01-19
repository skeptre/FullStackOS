const db = require('../../database.js');

exports.createUser = (user, callback) => {
    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    db.run(query, [user.first_name, user.last_name, user.email, user.password], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, this.lastID);
    });
};

exports.validateUserCredentials = (email, callback) => {
    const query = `SELECT user_id, password FROM users WHERE email = ?`;

    db.get(query, [email], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

exports.isTokenValid = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT session_token FROM sessions WHERE user_id = ?`;

        db.get(query, [userId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.session_token : null);
            }
        });
    });
};

exports.invalidateToken = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM sessions WHERE user_id = ?`;

        db.run(query, [userId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes > 0); // true if a row was deleted
            }
        });
    });
};

exports.createSession = (userId, sessionToken) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = `DELETE FROM sessions WHERE user_id = ?`;
        db.run(deleteQuery, [userId], (err) => {
            if (err) return reject(err);

            const insertQuery = `INSERT INTO sessions (user_id, session_token) VALUES (?, ?)`;
            db.run(insertQuery, [userId, sessionToken], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};
