const userModel = require('../models/User.model');
const tokenManager = require('../config/tokenManager');
const passport = require('passport');

exports.login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    // userModel.findOne({userName: username, password: password}, function(err, user) {
    //     if (err) {
    //         res.send({message: err});
    //     } else if (user) {
    //         var token = tokenManager.createToken(user, req);
    //         res.send({token: token});
    //     } else {
    //         res.status(400).send({message: 'Invalid User credentials.'});
    //     }
    // });
    passport.authenticate('local', {failureFlash:true, assignProperty: 'user'},function (err, user, info) {
        console.log('authenticated');
        if (err) {
          return next(err);
        }
        if (user.reason) {
          return res.status(400).send({success: false, reason: user.reason});
        } else if (!user) {
          res.status(400);
          console.log('information', info);
          return res.send({success: false, reason: info.message});
        }
  
        var token = tokenManager.createToken(user, req);
        console.log('request user', req.user);
        if (token) {
          return res.status(200).send({success: true, token: token});
        } else {
          return res.status(400).send({success: false, reason: 'User failed to Authenticate'});
        }
    })(req, res, next);
};