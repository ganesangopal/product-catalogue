const userModel = require('../models/User.model');

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
};

exports.deleteUser = function (req, res) {

    userModel.deleteOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

};