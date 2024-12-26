const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    product_description: {
        type: String,
        // required: true
    },
    product_images: [
        {
            type: String,
            // required: true
        }
    ],
    model_no: {
        type: String,
        // required: true
    },
    colors_available: {
        type: [String],
        // required: true
    },
    size: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


const Product = mongoose.model('Product', ProductSchema);


module.exports =  Product;