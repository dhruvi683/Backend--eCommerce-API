const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 2 characters long'],
        maxLength: [100, 'Name cannot be more than 100 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email address',
        ],
    },
    address: {
        type: String,
        required: true,
        minLength: [5, 'Address must be at least 5 characters long'],
        maxLength: [255, 'Address cannot be more than 255 characters long'],
    },
});

module.exports = mongoose.model('User', UserSchema);