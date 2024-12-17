const mongoose = require('mongoose');

// Define the schema for the Category model
const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_icon: {
        type: String,
        required: true
    },
    category_description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// Create and export the models
const Category = mongoose.model('Category', CategorySchema);


module.exports =  Category;
