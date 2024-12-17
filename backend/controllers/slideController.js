const SlideModel = require('../models/Slide');
const path = require('path');


exports.createSlide = async (req, res) => {
    try {
        const { grey_line, blue_line, link } = req.body;
        
        const slide_images = req.files.map(file => {
            // Normalize the path to use forward slashes
            return path.join('images', file.filename).replace(/\\/g, '/');
        });
        const newSlide = new SlideModel({
            grey_line,
            blue_line,
            link,
            slide_images
        });

        await newSlide.save();
        res.status(201).json({ message: 'Slide created successfully', slide: newSlide });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create slide' });
    }
};

// Get all slides
exports.getSlides = async (req, res) => {
    try {
        const slides = await SlideModel.find();
        res.status(200).json(slides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch slides' });
    }
};

// Edit an existing slide
exports.editSlide = async (req, res) => {
    const { slideId } = req.params; // Get slide ID from URL
    const { grey_line, blue_line, link, folder } = req.body;

    try {
        const slide = await SlideModel.findById(slideId);
        if (!slide) {
            return res.status(404).json({ error: 'Slide not found' });
        }

        // Update slide properties
        slide.grey_line = grey_line || slide.grey_line;
        slide.blue_line = blue_line || slide.blue_line;
        slide.link = link || slide.link;

        if (req.files && req.files.length > 0) {
            const slide_images = req.files.map(file => path.join('images', folder || 'default', file.filename));
            slide.slide_images = slide_images;
        }

        await slide.save();
        res.status(200).json({ message: 'Slide updated successfully', slide });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update slide' });
    }
};

// Delete a slide
exports.deleteSlide = async (req, res) => {
    const { slideId } = req.params; // Get slide ID from URL

    try {
        const slide = await SlideModel.findByIdAndDelete(slideId);
        if (!slide) {
            return res.status(404).json({ error: 'Slide not found' });
        }
        res.status(200).json({ message: 'Slide deleted successfully', slide });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete slide' });
    }
};
