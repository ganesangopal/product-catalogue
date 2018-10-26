const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const uploads = require('../controllers/uploads');

// Product Routes.
router.route('/').get(products.getAllProducts);

//router.route('/').post(products.createProduct);
router.post('/', uploads.diskStorage, products.createProduct);

router.route('/:id').get(products.getProductById);

//router.route('/:id').put(products.updateProduct);
router.put('/:id', uploads.diskStorage, products.updateProduct);

router.route('/:id').delete(products.deleteProduct);

module.exports = router;