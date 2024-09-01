const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Category name must be at least 2 characters long'],
        maxLength: [100, 'Category name cannot be more than 100 characters long'],
    },
});

module.exports = mongoose.model('Category', CategorySchema);
