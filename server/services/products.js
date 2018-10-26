(function() {
    'use strict';
    const productModel = require('../models/Product.model');
    const productValidator = require('../validations/product.validator');

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
        var p = new productModel();
        p.productName = req.body.productName;
        p.price = req.body.price;
        p.instock = true;
        p.productsku = req.body.productsku;
        p.save(function (err) {
            if (err) {
                res.send(err);
            }
            if (req.file) {
                var newPath = './src/assets/products/' + req.file.filename;
                fs.rename(req.file.path, newPath, function(err) {
                    console.log('came to fs');
                    fs.stat(newPath, (err, stats) => {
                        if (err) {
                            throw err;
                        } else {
                            fs.unlink(req.file.path, function(err) {
                                //p.productImage = newPath;
                                var query = {_id: p._id};
                                var productImage = {productImage: newPath};
                                productModel.updateOne(query, productImage, {}, function(err, doc){
                                    if (err) return res.send(500, { error: err });
                                    p.productImage = newPath
                                    return res.send(p);
                                });
                                // p.save(function (err) {
                                //     if (err) {
                                //         res.send(err);
                                //     }
                                //     res.send(p);
                                // });
                            });
                        }
                        console.log(`stats: ${JSON.stringify(stats)}`);
                    });
                });
            } else {
                res.send(p);
            }
        });
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
                    prod.productName = req.body.productName ? req.body.productName : prod.productName;
                    prod.price = req.body.price ? req.body.price : prod.price;
                    prod.instock = req.body.instock ? req.body.instock : prod.instock;
                    prod.productsku = req.body.productsku ? req.body.productsku : prod.productsku;
                    prod.save(function (err) {
                        if (err) {
                            res.send(err);
                        }
                        if (req.file) {
                            var newPath = './src/assets/products/' + req.file.filename;
                            fs.rename(req.file.path, newPath, function(err) {
                                console.log('came to fs');
                                fs.stat(newPath, (err, stats) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        var query = {_id: prod._id};
                                        var productImage = {productImage: newPath};
                                        productModel.updateOne(query, productImage, {}, function(err, doc){
                                            if (err) return res.send(500, { error: err });
                                            return res.send(prod);
                                        });
                                    }
                                });
                            });
                        } else {
                            res.send(prod);
                        }
                    });
                } else {
                    res.status(404).send({message: 'No product found for the specified id'});
                }
            });
        });
    };

    exports.deleteProduct = (req, res) => {
        productModel.deleteOne({ _id: req.params.id }, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result.n) {
                res.json({ message: 'Successfully deleted' });
            } else {
                res.status(404).send('No product found to delete for the specified id.');
            }
        });
    }


})();