const express = require('express');
const categoryController = require('../controllers/categoryController');
const upload = require('../middlewares/multer');

const router = express.Router();
const {protect} = require('../middlewares/auth');


//add category protected
router.post('/',protect,  upload.single('category_icon'), categoryController.addCategory);

//edit category protected
router.put('/:categoryId',protect, upload.single('category_icon'), categoryController.editCategory);

//delete category
router.delete('/:categoryId', protect, categoryController.deleteCategory);

//delete many categories
router.post('/delete-many', categoryController.deleteManyCategories);


//get all categories public
router.get('/', categoryController.getAllCategories);

module.exports = router;