const userModel = require('../models/User.model');
const tokenManager = require('../config/tokenManager');

exports.login = (req, res) => {
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
};