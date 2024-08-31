const express = require('express');
const {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(getAllCategories)    // Get all categories
    .post(createCategory);    // Create a new category

categoryRouter.route('/:id')
    .get(getOneCategory)      // Get a specific category by ID
    .put(updateCategory)      // Update a specific category by ID
    .delete(deleteCategory);  // Delete a specific category by ID

module.exports = categoryRouter;
