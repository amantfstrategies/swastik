const mongoose = require('mongoose');


const SlideModelSchema = new mongoose.Schema({
    grey_line: {
        type: String,
        required: true
    },
    slide_images: [
        {
            type: String,
            required: true
        } 
    ],    
    blue_line: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const SlideModel = mongoose.model('SlideModel', SlideModelSchema);
module.exports = SlideModel;
