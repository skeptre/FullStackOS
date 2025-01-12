const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { createUser: createUserModel, validateUserCredentials } = require('../models/userModel'); // Import user model functions

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

// Register User
exports.createUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

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
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { email, password } = value;

    validateUserCredentials(email, async (err, user) => {
        if (err || !user) return res.status(401).json({ error_message: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error_message: 'Invalid credentials' });

        // Generate session token
        const session_token = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            user_id: user.user_id,
            session_token,
            message: 'Login successful'
        });
    });
};