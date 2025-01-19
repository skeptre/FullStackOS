const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { createUser: createUserModel, validateUserCredentials } = require('../models/userModel');

// Token store (temporary solution for logged-in users)
const tokenStore = {};

// Joi schema for user registration
const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required()
});

// Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

// Register User
exports.createUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.replace(/"/g, '');
        return res.status(400).json({ error_message: message });
    }

    const { first_name, last_name, email, password } = value;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { first_name, last_name, email, password: hashedPassword };

        createUserModel(userData, (err, userId) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error_message: 'Email already registered' });
                }
                return res.status(500).json({ error_message: 'Database error' });
            }
            res.status(201).json({
                user_id: userId,
                message: 'User registered successfully'
            });
        });
    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(500).json({ error_message: 'Internal server error' });
    }
};

// Log In User
exports.loginUser = (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        const message = error.details[0].message.replace(/"/g, '');
        return res.status(400).json({ error_message: message });
    }

    const { email, password } = value;

    validateUserCredentials(email, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error_message: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error_message: 'Invalid email or password' });
        }

        // Return the same token if the user is already logged in
        if (tokenStore[user.user_id]) {
            return res.status(200).json({
                user_id: user.user_id,
                session_token: tokenStore[user.user_id],
                message: 'Login successful'
            });
        }

        // Generate a new session token
        const session_token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        tokenStore[user.user_id] = session_token;

        res.status(200).json({
            user_id: user.user_id,
            session_token,
            message: 'Login successful'
        });
    });
};

// Log Out User
exports.logoutUser = (req, res) => {
    const token = req.headers['x-authorization'];
    if (!token) {
        return res.status(401).json({ error_message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!tokenStore[decoded.user_id]) {
            return res.status(401).json({ error_message: 'User not logged in or already logged out' });
        }

        // Remove the token from the store
        delete tokenStore[decoded.user_id];
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        return res.status(401).json({ error_message: 'Invalid or expired token' });
    }
};
