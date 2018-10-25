(function() {
    const userModel = require('../models/User.model');
    const userValidator = require('../validations/user.validator');
    const userService = require('../services/users');

    exports.getAllUsers = (req, res) => {
        console.log('Request object',req.user);
        userService.getAllUsers(req, res);
    };

    exports.createUser = async (req, res, next) => {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            userValidator.userCreateValidator(req.body).then((validation) => {
                if (validation.error) {
                    res.status(400).send(validation.message);
                } else {
                    userService.createUser(req, res);
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
        userService.getUserById(req, res);
    };

    exports.getUserByName = (req, res) => {
        userService.getUserByName(req, res);
    };

    exports.updateUser = (req, res) => {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
            userService.updateUser(req, res);
        } else {
            res.status(401).send('Not authorized to update the user.');
        }
    };

    exports.deleteUser = function (req, res) {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
            userService.deleteUser(req, res);
        } else {
            res.status(401).send('Not Authorized to delete the user.');
        }

    };
})();