(function() {
    'use strict';
    const productModel = require('../models/Product.model');
    const productValidator = require('../validations/product.validator');
    const fs = require('fs');
    const config = require('../config/config');
    const async = require('async');

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
        if (req.file) {
            async.waterfall([
                function(callback) {
                    var newPath = './' + config.productImageDir + '/' + req.file.filename;
                    fs.rename('./' + req.file.path, newPath, function(err) {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        callback(null, newPath);
                    });
                },
                function (newPath, callback) {
                    fs.stat(newPath, (err, stats) => {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        callback(null, newPath);
                    });
                },
                function (newPath, callback) {
                    p.productImage = newPath;
                    p.save(function (err) {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        callback(null, null, p);
                    });
                }
            ], function(err, errCode, product) {
                    if (err) {
                        res.status(errCode).send(err);
                    } else {
                        res.send(product);
                    }
            });
        } else {
            p.save(function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(p);
            });
        }
    }

    exports.updateProduct = (req, res) => {
        async.waterfall([
            function(callback) {
                productModel.findById(req.params.id, function (err, prod) {
                    // if (err) {
                    //     return callback(err, 500, null);
                    // }
                    if (!prod) {
                        var errorMessage = {message: 'No product found for the specified id'};
                        return callback(errorMessage, 404, null);
                    }
                    callback(null, prod);
                });
            },
            function(prod, callback) {
                productValidator.productUpdateValidator(req.body, req.params.id, function(err, errCode) {
                    if (err) {
                        return callback(err, errCode, null);
                    }
                    callback(null, prod);
                });
            },
            function(prod, callback) {
                if (req.file) {
                    var newPath = './src/assets/products/' + req.file.filename;
                    fs.rename(req.file.path, newPath, function(err) {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        callback(null, prod, newPath);
                    });
                }
                else {
                    var query = {_id: prod._id};
                    productModel.findOneAndUpdate(query, req.body, {new:true}, function(err, doc) {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        prodUpdateComplete(null, null, doc);
                    });
                }
            },
            function(prod, newPath, callback) {
                fs.stat(newPath, (err, stats) => {
                    if (err) {
                        return callback(err, 500, null);
                    }
                    callback(null, prod, newPath);
                });
            },
            function(prod, newPath, callback) {
                if (prod.productImage !== newPath && fs.existsSync(prod.productImage)) {
                    fs.unlink(prod.productImage, function(err) {
                        if (err) {
                            return callback(err, 500, null);
                        }
                        var query = {_id: prod._id};
                        req.body.productImage = newPath;
                        productModel.findOneAndUpdate(query, req.body, {new: true}, function(err, doc){
                            if (err) {
                                return callback(err, 500, null);
                            }
                            prodUpdateComplete(null, null, doc);
                        });
                    });
                } else {
                    var query = {_id: prod._id};
                    req.body.productImage = newPath;
                    productModel.findOneAndUpdate(query, req.body, {new: true}, function(err, doc){
                        if (err) {
                            return callback(err, 500, null);
                        }
                        prodUpdateComplete(null, null, doc);
                    });
                }
            }
        ], prodUpdateComplete);

        function prodUpdateComplete(err, errCode, result) {
            if (err) {
                res.status(errCode).send(err);
            } else {
                res.send(result);
            }
        }
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