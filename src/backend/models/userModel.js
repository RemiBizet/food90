const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

// user Model (usernmae + password)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

