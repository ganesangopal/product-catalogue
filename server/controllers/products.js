(function() {
    'use strict';
    const productValidator = require('../validations/product.validator');
    const productService = require('../services/products');

    exports.getAllProducts = (req, res) => {
        productService.getAllProducts(req, res);
    };

    exports.createProduct = (req, res) => {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            productValidator.productCreateValidator(req.body, function(err, errCode) {
                if (err) {
                    return res.status(errCode).send(err);
                }
                productService.createProduct(req, res);
            });
        } else if (!isAdmin) {
            res.status(401).send('Not authorised to create product.');
        } else {
            res.status(400).send({error: 'Bad request'});
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