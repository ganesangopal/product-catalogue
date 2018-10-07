const express = require('express');
//const app = express();
const router = express.Router();
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productModel = require('../models/Product.model');
const userModel = require('../models/User.model');
const tokenManager = require('../config/tokenManager');

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

router.route('/login').post((req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userModel.findOne({userName: username, password: password}, function(err, user) {
        if (err) {
            res.send({message: err});
        } else if (user) {
            var token = tokenManager.createToken(user, req);
            res.send({token: token});
        } else {
            res.status(400).send({message: 'Invalid User credentials.'});
        }
    });
    // userModel.findById(req.params.id, function (err, user) {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.json(user);
    // });
});


router.route('/products').get((req, res) => {
    //res.status(200).send(products);
    // productModel.countDocuments({},function(err,count) {
    //     console.log('count', count);
    // })
    //console.log('count', productModel.count());
    productModel.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
});

router.route('/users').get((req, res) => {
    userModel.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});

router.route('/users').post((req, res) => {
    var user = new userModel();
    if (Object.keys(req.body).length > 0) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.userName = req.body.userName;
        user.emailAddress = req.body.emailAddress;
        user.password = req.body.password;
        if (req.body.userName === 'admin') {
            user.roles.push('administrator');
        } else {
            user.roles.push('authenticated user');
        }
        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'User Created !' })
        })
    }
});

router.route('/users/:id').get((req, res) => {
    userModel.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

router.route('/users/name/:name').get((req, res) => {
    userModel.find({userName: req.params.name}, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

router.route('/users/:id').put((req, res) => {
    userModel.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
        user.userName = req.body.userName ? req.body.userName : user.userName;
        user.emailAddress = req.body.emailAddress ? req.body.emailAddress : user.emailAddress;
        user.password = req.body.password ? req.body.password : user.password;
        user.save(function (err) {
            if (err)
                res.send(err);

            res.send(user);
        });
        //res.json(user);
    });
});

router.route('/users/:id').delete(function (req, res) {

    userModel.deleteOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

});

router.route('/products').post((req, res) => {
    var p = new productModel();
    console.log('req', req.body);
    if (Object.keys(req.body).length > 0) {
        // productModel.countDocuments({},function(err,count) {
        //     console.log('count', count);
        //     p.productId = count + 1;
        // });
        p.productName = req.body.productName;
        p.price = req.body.price;
        p.instock = true;
        p.productsku = req.body.productsku;
        p.save(function (err) {
            if (err) {
                res.send(err);
            }
            //res.send({ message: 'Product Created !' });
            res.send(p);
        });
    } else {
        console.log('else part');
        res.send({error: 'Bad request'});
    }
});

router.route('/products/:id').get((req, res) => {
    // const productId = +req.params.id;
    // let currentProduct = {};
    // products.find((currentValue, index, products) => {
    //     if (productId === products[index].productId) {
    //         currentProduct = currentValue;
    //         return currentProduct;
    //     }
    // });
    productModel.findById(req.params.id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
    //res.status(200).json(currentProduct);
});

router.route('/products/:id').put((req, res) => {
    // const productId = +req.params.id;
    // let currentProduct = {};
    // products.find((currentValue, index, products) => {
    //     if (productId === products[index].productId) {
    //         currentProduct = currentValue;
    //         return currentProduct;
    //     }
    // });
    productModel.findById(req.params.id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.productName = req.body.productName ? req.body.productName : prod.productName;
        prod.price = req.body.price ? req.body.price : prod.price;
        prod.instock = req.body.instock ? req.body.instock : prod.instock;
        prod.productsku = req.body.productsku ? req.body.productsku : prod.productsku;
        prod.save(function (err) {
            if (err)
                res.send(err);

            //res.json({ message: 'Product updated!' });
            res.send(prod);
        });
    });
    //res.status(200).json(currentProduct);
});

router.route('/products/:id').delete(function (req, res) {

    productModel.deleteOne({ _id: req.params.id }, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

});

module.exports = router;