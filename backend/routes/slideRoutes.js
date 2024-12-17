const express = require('express');
const upload = require('../middlewares/multer');
const slideController = require('../controllers/slideController');

const router = express.Router();

router.post('/', upload.array('slide_images'), slideController.createSlide);

router.get('/', slideController.getSlides);

router.put('/:slideId', upload.array('slide_images'), slideController.editSlide);

router.delete('/:slideId', slideController.deleteSlide);

module.exports = router;
