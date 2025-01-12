const jwt = require('jsonwebtoken');

console.log('SECRET_KEY:', process.env.SECRET_KEY);

const authMiddleware = (req, res, next) => {
    if (!process.env.SECRET_KEY) {
        return res.status(500).json({ error_message: 'Server misconfiguration: Missing SECRET_KEY' });
    }

    const token = req.headers['x-authorization'];
    if (!token) return res.status(401).json({ error_message: 'Access token required' });

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error_message: 'Token expired' });
        }
        return res.status(401).json({ error_message: 'Invalid token' });
    }
};

module.exports = authMiddleware;