(function() {
    'use strict';
    const userModel = require('../models/User.model');
    const userValidator = require('../validations/user.validator');
    const encrypt = require('../helpers/encryption');

    exports.getAllUsers = (req, res) => {
        userModel.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.send(users);
        })
    };

    exports.createUser = (req, res) => {
        var user = new userModel();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.userName = req.body.userName;
        user.emailAddress = req.body.emailAddress;
        user.salt = encrypt.createSalt();
        user.password = encrypt.hashPwd(user.salt, req.body.password);
        if (req.body.userName === 'admin') {
            user.roles.push('administrator');
        } else {
            user.roles.push('authenticated user');
        }
        user.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                user.salt = undefined;
                user.password = undefined;
                console.log('user data', user);
                res.send(user)
            }
        });
    };

    exports.getUserById = (req, res) => {
        userModel.findById(req.params.id, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };

    exports.getUserByName = (req, res) => {
        userModel.find({userName: req.params.name}, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };

    exports.updateUser = (req, res) => {
        userModel.findById(req.params.id, function (err, user) {
            if (err) {
                res.send(err);
            }
            userValidator.userUpdateValidator(req.body, req.params.id).then((validation) => {
                console.log('valid data', validation);
                if (validation.error) {
                    res.status(400).send(validation.message);
                } else if (user) {
                    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
                    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
                    user.userName = req.body.userName ? req.body.userName : user.userName;
                    user.emailAddress = req.body.emailAddress ? req.body.emailAddress : user.emailAddress;
                    if (req.body.password) {
                        user.salt = encrypt.createSalt();
                        user.password = encrypt.hashPwd(user.salt, req.body.password);
                    }
                    user.save(function (err) {
                        if (err)
                            res.send(err);
                        user.salt = undefined;
                        user.password = undefined;
                        res.send(user);
                    });
                } else {
                    res.status(404).send('No user found for the specified id.');
                }
            });
        });
    };

    exports.deleteUser = (req, res) => {
        userModel.deleteOne({ _id: req.params.id }, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result.n) {
                res.json({ message: 'Successfully deleted' });
            } else {
                res.status(404).send('No user found to delete for the specified id.');
            }
        });
    };
})();