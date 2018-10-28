(function() {
    'use strict';
    const productModel = require('../models/Product.model');
    const productValidator = require('../validations/product.validator');
    const fs = require('fs');
    const config = require('../config/config');

    exports.getAllProducts = (req, res) => {
        productModel.find(function (err, products) {
            if (err) {
                res.send(err);
            }
            res.send(products);
        });
    };

    exports.getProductById = (req, res) => {
        productModel.findById(req.params.id, function (err, prod) {
            if (err)
                res.send(err);
            res.json(prod);
        });
    };

    exports.createProduct = (req, res) => {
        var p = new productModel();
        p.productName = req.body.productName;
        p.price = req.body.price;
        p.instock = true;
        p.productsku = req.body.productsku;
        console.log('file input', req.file);
        if (req.file) {
            var newPath = './' + config.productImageDir + '/' + req.file.filename;
            fs.rename('./' + req.file.path, newPath, function(err) {
                fs.stat(newPath, (err, stats) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        p.productImage = newPath;
                        p.save(function (err) {
                            if (err) {
                                return res.send(err);
                            }
                            res.send(p);
                        });
                    }
                });
            });
        } else {
            p.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                res.send(p);
            });
        }
    }

    exports.updateProduct = (req, res) => {
        productModel.findById(req.params.id, function (err, prod) {
            if (err) {
                res.send(err);
            }
            console.log('body data', req.body);
            productValidator.productUpdateValidator(req.body, req.params.id).then(validation => {
                if (validation.error) {
                    console.log('validation result', validation);
                    res.status(400).send(validation.message);
                } else if (prod) {
                    if (req.file) {
                        var newPath = './src/assets/products/' + req.file.filename;
                        fs.rename(req.file.path, newPath, function(err) {
                            console.log('came to fs');
                            fs.stat(newPath, (err, stats) => {
                                if (err) {
                                    throw err;
                                } else {
                                    if (prod.productImage !== newPath && fs.existsSync(prod.productImage)) {
                                        fs.unlink(prod.productImage, function(err) {
                                            if (err) return res.send(err);
                                            var query = {_id: prod._id};
                                            req.body.productImage = newPath;
                                            productModel.findOneAndUpdate(query, req.body, {new: true}, function(err, doc){
                                                if (err) return res.send(500, { error: err });
                                                return res.send(doc);
                                            });
                                        });
                                    } else {
                                        var query = {_id: prod._id};
                                        req.body.productImage = newPath;
                                        productModel.findOneAndUpdate(query, req.body, {new: true}, function(err, doc){
                                            if (err) return res.send(500, { error: err });
                                            return res.send(doc);
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        var query = {_id: prod._id};
                        productModel.findOneAndUpdate(query, req.body, {new:true}, function(err, doc){
                            if (err) return res.send(500, { error: err });
                            return res.send(doc);
                        });
                    }
                } else {
                    res.status(404).send({message: 'No product found for the specified id'});
                }
            });
        });
    };

    exports.deleteProduct = (req, res) => {
        productModel.findOneAndDelete({ _id: req.params.id }, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result) {
                console.log('deleted data', result);
                if (result.productImage && fs.existsSync(result.productImage)) {
                    fs.unlink(result.productImage, function(err, data) {
                        if (err) {
                            return res.send(err);
                        }
                        res.json({ message: 'Successfully deleted' });
                    });
                } else {
                    res.json({ message: 'Successfully deleted' });
                }
            } else {
                res.status(404).send('No product found to delete for the specified id.');
            }
        });
    }


})();