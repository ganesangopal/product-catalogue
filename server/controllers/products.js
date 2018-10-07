const productModel = require('../models/Product.model');

exports.getAllProducts = (req, res) => {
    productModel.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
};

exports.createProduct = (req, res) => {
    var p = new productModel();
    if (Object.keys(req.body).length > 0) {
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
    productModel.findById(req.params.id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        if (prod) {
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
};

exports.deleteProduct = function (req, res) {

    productModel.deleteOne({ _id: req.params.id }, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

};