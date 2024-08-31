const Product = require('../schemas/Product');
const Category = require('../schemas/Category');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        if (!products.length) {
            return res.status(200).json({ message: "No products found in the database" });
        } else {
            return res.status(200).json(products);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get one product by ID
const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');
        if (product) {
            return res.status(200).json({ product });
        }
        return res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
        });

        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }else {
            return res.status(200).json({ message:"Product updated successfully",updatedProduct });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }else {
            return res.status(200).json({ message: 'Product deleted successfully',deletedProduct });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
