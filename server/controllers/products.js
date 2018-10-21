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

exports.createProduct = (req, res) => {
    var isAdmin = productValidator.isAdmin(req);
    if (isAdmin && Object.keys(req.body).length > 0) {
        productValidator.productCreateValidator(req.body).then((validation) => {
            if (validation.error) {
                res.status(400).send(validation.message);
            } else {
                var p = new productModel();
                p.productName = req.body.productName;
                p.price = req.body.price;
                p.instock = true;
                p.productsku = req.body.productsku;
                p.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(p);
                });
            }
        });
    } else if (!isAdmin) {
        res.status(401).send('Not authorised to create product.');
    } else {
        res.send({error: 'Bad request'});
    }
};

exports.getProductById = (req, res) => {
    productModel.findById(req.params.id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
};

exports.updateProduct = (req, res) => {
    var isAdmin = productValidator.isAdmin(req);
    if (isAdmin) {
        productModel.findById(req.params.id, function (err, prod) {
            if (err) {
                res.send(err);
            }
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
                        if (err)
                            res.send(err);
                        res.send(prod);
                    });
                } else {
                    res.status(404).send({message: 'No product found for the specified id'});
                }
            });
        });
    } else {
        res.status(401).send('Not Authorized to update the product.');
    }
};

exports.deleteProduct = function (req, res) {
    var isAdmin = productValidator.isAdmin(req);
    if (isAdmin) {
        productModel.deleteOne({ _id: req.params.id }, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result.n) {
                res.json({ message: 'Successfully deleted' });
            } else {
                res.status(404).send('No product found to delete for the specified id.');
            }
        });
    } else {
        res.status(401).send('Not Authorized to delete the product.');
    }

};