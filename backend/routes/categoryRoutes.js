const express = require('express');
const categoryController = require('../controllers/categoryController');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/', upload.single('category_icon'), categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.put('/:categoryId', upload.single('category_icon'), categoryController.editCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;