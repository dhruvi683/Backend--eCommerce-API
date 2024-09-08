const Product = require('../schemas/Product');
const Category = require('../schemas/Category');
const cloudinary = require('cloudinary').v2;

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId');
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
        const product = await Product.findById(id).populate('categoryId');
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
        const { name, description, price, categoryId, isPopular, isBestseller, isNewArrival } = req.body;
        
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            categoryId,
            isPopular,
            isBestseller,
            isNewArrival,
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
        const { name, description, price, categoryId, isPopular, isBestseller, isNewArrival } = req.body;
        
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, categoryId, isPopular, isBestseller, isNewArrival },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        } else {
            return res.status(200).json({ message: "Product updated successfully", updatedProduct });
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
        } else {
            return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const uploadProductImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the product exists before attempting to upload the image
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the file was uploaded correctly by multer
        if (req.file && req.file.path) {
            // Update only the image field, avoiding validation of other fields
            product.image = req.file.path;
            await product.save({ validateBeforeSave: false }); // Avoid validation for other fields like categoryId

            return res.status(200).json({ message: 'Image uploaded successfully', product });
        } else {
            console.log(req.file);
            return res.status(422).json({ message: 'Invalid image or no file uploaded' });
        }
    } catch (error) {
        console.error('Error while uploading product image:', error); // Log the error to the console
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get popular products
const getPopularProducts = async (req, res) => {
    try {
        const popularProducts = await Product.find({ isPopular: true }).populate('categoryId');
        if (!popularProducts.length) {
            return res.status(200).json({ message: "No popular products found" });
        } else {
            return res.status(200).json(popularProducts);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get bestseller products
const getBestsellerProducts = async (req, res) => {
    try {
        const bestsellerProducts = await Product.find({ isBestseller: true }).populate('categoryId');
        if (!bestsellerProducts.length) {
            return res.status(200).json({ message: "No bestseller products found" });
        } else {
            return res.status(200).json(bestsellerProducts);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get new arrival products
const getNewArrivalProducts = async (req, res) => {
    try {
        const newArrivalProducts = await Product.find({ isNewArrival: true }).populate('categoryId');
        if (!newArrivalProducts.length) {
            return res.status(200).json({ message: "No new arrival products found" });
        } else {
            return res.status(200).json(newArrivalProducts);
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
    uploadProductImage,
    getPopularProducts,
    getBestsellerProducts,
    getNewArrivalProducts
};