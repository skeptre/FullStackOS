const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, validateUserCredentials, isTokenValid, invalidateToken, createSession } = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error_message: 'All fields are required' });
    }

    if (password.length < 8 || password.length > 20) {
        return res.status(400).json({ error_message: 'Password must be between 8 and 20 characters' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error_message: 'Password must include upper/lowercase, a number, and a special character' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        createUser({ first_name, last_name, email, password: hashedPassword }, (err, userId) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error_message: 'Email already registered' });
                }
                return res.status(500).json({ error_message: 'Database error' });
            }
            res.status(201).json({ user_id: userId });
        });
    } catch (err) {
        return res.status(500).json({ error_message: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password, ...extraFields } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error_message: 'Email and password are required' });
    }

    if (Object.keys(extraFields).length > 0) {
        return res.status(400).json({ error_message: 'Unexpected fields in request' });
    }

    validateUserCredentials(email, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error_message: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error_message: 'Invalid email or password' });
        }

        try {
            const existingToken = await isTokenValid(user.user_id);
            if (existingToken) {
                return res.status(200).json({
                    user_id: user.user_id,
                    session_token: existingToken,
                    message: 'Already logged in',
                });
            }

            const session_token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            await createSession(user.user_id, session_token);

            res.status(200).json({ user_id: user.user_id, session_token });
        } catch (err) {
            return res.status(500).json({ error_message: 'Error during login process' });
        }
    });
};

exports.logoutUser = async (req, res) => {
    const token = req.headers['x-authorization'];

    if (!token) {
        return res.status(401).json({ error_message: 'User not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const success = await invalidateToken(decoded.user_id);
        if (success) {
            return res.status(200).json({ message: 'Logout successful' });
        }
        return res.status(500).json({ error_message: 'Failed to logout' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error_message: 'Token expired' });
        }
        return res.status(401).json({ error_message: 'Invalid token' });
    }
};
