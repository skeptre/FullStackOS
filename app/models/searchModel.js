const db = require('../../database.js');

exports.searchEvents = (queryParams) => {
    const { query, status, limit, offset } = queryParams;
    const conditions = [];
    const values = [];

    if (query) {
        conditions.push("(name LIKE ? OR description LIKE ?)");
        values.push(`%${query}%`, `%${query}%`);
    }

    if (status) {
        conditions.push("status = ?");
        values.push(status);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const sql = `SELECT * FROM events ${whereClause} LIMIT ? OFFSET ?`;

    values.push(limit || 20, offset || 0);

    return new Promise((resolve, reject) => {
        db.all(sql, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
