const Category = require('../models/Category');
const path = require('path');
exports.addCategory = async (req, res) => {
    try {
        console.log("category create req:", req.body)
        const { category_name, category_description } = req.body;
        const category_icon = path.join('images', req.file.filename).replace(/\\/g, '/');

        const newCategory = new Category({ category_name, category_icon, category_description });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add category' });
    }
};



exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log("delere request:", categoryId)
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

exports.editCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        console.log("edit cat req:", categoryId)
        const { category_name, category_description } = req.body;
        
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.category_name = category_name || category.category_name;
        category.category_description = category_description || category.category_description;

        if (req.file) {
            category.category_icon = req.file.path.join('images', file.filename).replace(/\\/g, '/');
        }

        await category.save();
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};



// Delete Many Categories
exports.deleteManyCategories = async (req, res) => {
    try {
        const { categoryIds } = req.body; // Expecting an array of category IDs
        console.log("categoryIds:", categoryIds)
        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({ error: 'Invalid category IDs' });
        }

        const result = await Category.deleteMany({ _id: { $in: categoryIds } });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No categories found to delete' });
        }

        res.status(200).json({
            message: `Successfully deleted ${result.deletedCount} categories`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete categories' });
    }
};