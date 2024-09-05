const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Product name must be at least 2 characters long'],
        maxLength: [100, 'Product name cannot be more than 100 characters long'],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Description must be at least 5 characters long'],
        maxLength: [500, 'Description cannot be more than 500 characters long'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductSchema);
