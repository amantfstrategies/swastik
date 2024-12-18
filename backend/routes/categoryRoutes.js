const express = require('express');
const categoryController = require('../controllers/categoryController');
const upload = require('../middlewares/multer');

const router = express.Router();
const {protect} = require('../middlewares/auth');

router.post('/',protect,  upload.single('category_icon'), categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.put('/:categoryId',protect, upload.single('category_icon'), categoryController.editCategory);
router.delete('/:categoryId', protect, categoryController.deleteCategory);
router.post('/delete-many', categoryController.deleteManyCategories);

module.exports = router;