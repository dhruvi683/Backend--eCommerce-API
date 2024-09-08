const Category = require('../schemas/Category');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories.length) {
            return res.status(200).json({ message: "No categories found in the database" });
        } else {
            return res.status(200).json(categories);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get one category by ID
const getOneCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (category) {
            return res.status(200).json({ category });
        }
        return res.status(404).json({ message: 'Category not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({
            name,
        });

        const savedCategory = await newCategory.save();
        return res.status(201).json(savedCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update an existing category by ID
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }else {
            return res.status(200).json({ message: "Category updated successfully", updatedCategory });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};