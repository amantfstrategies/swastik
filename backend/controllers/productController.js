const Product = require('../models/Product');
const Category = require('../models/Category');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        console.log("product create req:", req.body)
        const { product_name, category, product_description, model_no, colors_available, size, price } = req.body;

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const product_images = req.files.map(file =>
            path.join('images', file.filename).replace(/\\/g, '/')
        );

        const newProduct = new Product({
            product_name,
            category,
            product_description,
            product_images,
            model_no,
            colors_available: colors_available.split(','),
            size,
            price
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        console.log("product update req:", req.body)
        const { id } = req.params;
        const { product_name, category, product_description, model_no, colors_available, size, price } = req.body;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.product_name = product_name || product.product_name;
        product.category = category._id || product.category;
        product.product_description = product_description || product.product_description;
        product.model_no = model_no || product.model_no;
        product.colors_available = colors_available ? colors_available.split(',') : product.colors_available;
        product.size = size || product.size;
        product.price = price || product.price;

        if (req.files.length > 0) {
            product.product_images = req.files.map(file =>
                path.join('images', file.filename).replace(/\\/g, '/')
            );
        }

        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all products with pagination
exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category } = req.query;
        const filter = {};

        if (category) {
            filter.category = category; 
        }

        const products = await Product.find(filter)
            .populate('category') 
            .skip((page - 1) * limit) 
            .limit(parseInt(limit)); 

        const totalProducts = await Product.countDocuments(filter); 

        res.status(200).json({
            products,
            totalPages: Math.ceil(totalProducts / limit), 
            currentPage: parseInt(page), 
            totalProducts, 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search products by name and category name
exports.searchProduct = async (req, res) => {
    try {
        const { name, categoryName } = req.query;

        const query = {};
        if (name) {
            query.product_name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        if (categoryName) {
            const category = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } });
            if (category) {
                query.category = category._id;
            }
        }

        const products = await Product.find(query).populate('category');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




exports.deleteManyProducts = async (req, res) => {
    try {
        const { productIds } = req.body; 

        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ error: 'Product IDs are required and must be an array.' });
        }

        // Delete multiple products
        const deletedProducts = await Product.deleteMany({
            _id: { $in: productIds }
        });

        if (deletedProducts.deletedCount === 0) {
            return res.status(404).json({ error: 'No products found to delete' });
        }

        res.status(200).json({
            message: `${deletedProducts.deletedCount} products deleted successfully.`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
