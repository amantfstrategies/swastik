const express = require('express');
const upload = require('../middlewares/multer');
const slideController = require('../controllers/slideController');

const {protect} = require('../middlewares/auth');
const router = express.Router();

router.post('/',protect, upload.array('slide_images'), slideController.createSlide);

router.get('/', slideController.getSlides);

router.put('/:slideId',protect, upload.array('slide_images'), slideController.editSlide);

router.delete('/:slideId',protect, slideController.deleteSlide);

module.exports = router;
