const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer'); // Assuming multer middleware is in `middleware/upload.js`
const {
    addProduct,
    deleteProduct,
    editProduct,
    getProduct,
    getAllProducts,
    searchProduct,
    deleteManyProducts
} = require('../controllers/productController');

const {protect} = require('../middlewares/auth');

// Add a new product
router.post('/',protect, upload.array('product_images'), addProduct);

// Delete a product
router.delete('/:id',protect, deleteProduct);

// Edit a product
router.put('/:id',protect, upload.array('product_images'), editProduct);

//delete many 
router.post('/delete-many',protect, deleteManyProducts);


// Search products by name and category
router.get('/search', searchProduct);

// Get a single product
router.get('/:id', getProduct);

// Get all products with pagination
router.get('/', getAllProducts);





module.exports = router;
