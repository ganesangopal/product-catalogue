(function() {
    'use strict';
    const productModel = require('../models/Product.model');
    const productValidator = require('../validations/product.validator');
    const productService = require('../services/products');
    const fs = require('fs');

    exports.getAllProducts = (req, res) => {
        productService.getAllProducts(req, res);
    };

    exports.createProduct = (req, res) => {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            productValidator.productCreateValidator(req.body).then((validation) => {
                if (validation.error) {
                    res.status(400).send(validation.message);
                } else {
                    productService.createProduct(req, res);
                }
            });
        } else if (!isAdmin) {
            res.status(401).send('Not authorised to create product.');
        } else {
            res.send({error: 'Bad request'});
        }
    };

    exports.getProductById = (req, res) => {
        productService.getProductById(req, res);
    };

    exports.updateProduct = (req, res) => {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin) {
            productService.updateProduct(req, res);
        } else {
            res.status(401).send('Not Authorized to update the product.');
        }
    };

    exports.deleteProduct = function (req, res) {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin) {
            productService.deleteProduct(req, res);
        } else {
            res.status(401).send('Not Authorized to delete the product.');
        }

    };
})();