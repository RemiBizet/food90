const express = require('express');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Route to register a given user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success : false, message: 'User already exists' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Create a cart for the new user
        const cart = new Cart({
            userId: username,
            items: [] // Start with an empty cart
        });

        // Save the cart to the database
        await cart.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ success : true, message: 'User registered successfully', token, hashedPassword, user });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success : false, message: 'Server error' });
    }
});

// Login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
    
        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate a JWT token
            const token = jwt.sign({ userId: user._id }, 'jwt_secret', { expiresIn: '1h' });
            
            return res.status(200).json({ msg: "Login success", token,user});
        } else {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
