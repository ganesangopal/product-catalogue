const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
//const uploads = require('../controllers/uploads');
const productImageUpload = require('../config/productImageUpload');

// Product Routes.
router.route('/').get(products.getAllProducts);

//router.route('/').post(products.createProduct);
router.post('/', productImageUpload.diskStorage, products.createProduct);

router.route('/:id').get(products.getProductById);

//router.route('/:id').put(products.updateProduct);
router.put('/:id', productImageUpload.diskStorage, products.updateProduct);

router.route('/:id').delete(products.deleteProduct);

module.exports = router;