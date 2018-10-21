(function() {
    const userModel = require('../models/User.model');
    const userValidator = require('../validations/user.validator');

    exports.getAllUsers = (req, res) => {
        console.log('Request object',req.user);
        userModel.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.send(users);
        })
    };

    exports.createUser = async (req, res, next) => {
        var user = new userModel();
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            userValidator.userCreateValidator(req.body).then((validation) => {
                if (validation.error) {
                    res.status(400).send(validation.message);
                } else {
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
                        } else {
                            res.send(user)
                        }
                    });
                }
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else if (!isAdmin) {
            res.status(401).send('UnAuthorized for creating user.');
        } else {
            res.status(400);
        }
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
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
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
                        user.password = req.body.password ? req.body.password : user.password;
                        user.save(function (err) {
                            if (err)
                                res.send(err);

                            res.send(user);
                        });
                    } else {
                        res.status(404).send('No user found for the specified id.');
                    }
                });
            });
        } else {
            res.status(401).send('Not authorized to update the user.');
        }
    };

    exports.deleteUser = function (req, res) {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
            userModel.deleteOne({ _id: req.params.id }, function (err, result) {
                if (err) {
                    res.send(err);
                } else if (result.n) {
                    res.json({ message: 'Successfully deleted' });
                } else {
                    res.status(404).send('No user found to delete for the specified id.');
                }
            });
        } else {
            res.status(401).send('Not Authorized to delete the user.');
        }

    };
})();