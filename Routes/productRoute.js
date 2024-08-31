const express = require('express');
const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAllProducts)    // Get all products
    .post(createProduct);  // Create a new product

productRouter.route('/:id')
    .get(getOneProduct)    // Get a specific product by ID
    .put(updateProduct)    // Update a specific product by ID
    .delete(deleteProduct); // Delete a specific product by ID

module.exports = productRouter;
