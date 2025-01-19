const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, validateUserCredentials, isTokenValid, invalidateToken } = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error_message: 'All fields are required' });
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
            res.status(201).json({ user_id: userId, message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error_message: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error_message: 'Email and password are required' });
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

            res.status(200).json({
                user_id: user.user_id,
                session_token,
                message: 'Login successful',
            });
        } catch (error) {
            console.error('Error in login process:', error);
            return res.status(500).json({ error_message: 'Error during login process' });
        }
    });
};

exports.logoutUser = async (req, res) => {
    const userId = req.user?.user_id;

    if (!userId) {
        return res.status(401).json({ error_message: 'User not authenticated' });
    }

    try {
        const success = await invalidateToken(userId);
        if (success) {
            return res.status(200).json({ message: 'Logout successful' });
        }
        return res.status(500).json({ error_message: 'Failed to logout' });
    } catch (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ error_message: 'Logout failed' });
    }
};
