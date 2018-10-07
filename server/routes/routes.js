const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../controllers/users');
const products = require('../controllers/products');
const auth = require('../controllers/auth');


mongoose.connect('mongodb://localhost/productsCatalogue', {useNewUrlParser: true});

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request url ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/').get((req, res) => {
    res.send('Router works');
});

// Auth Routes
router.route('/login').post(auth.login);

// User Routes
router.route('/users').get(users.getAllUsers);

router.route('/users').post(users.createUser);

router.route('/users/:id').get(users.getUserById);

router.route('/users/name/:name').get(users.getUserByName);

router.route('/users/:id').put(users.updateUser);

router.route('/users/:id').delete(users.deleteUser);

// Product Routes.
router.route('/products').get(products.getAllProducts);

router.route('/products').post(products.createProduct);

router.route('/products/:id').get(products.getProductById);

router.route('/products/:id').put(products.updateProduct);

router.route('/products/:id').delete(products.deleteProduct);

module.exports = router;