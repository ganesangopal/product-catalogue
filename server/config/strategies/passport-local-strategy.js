(function() {
    'use strict';
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var userModel = require('../../models/User.model');

    module.exports = function() {
        passport.use(new LocalStrategy(
            function(username, password, done) {
                userModel.findOne({userName: username}, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (user.password !== password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ));

        passport.serializeUser(function(user, done) {
            console.log('AUTH: serializeUser');
      
            done(null, user._id);
        });
      
        passport.deserializeUser(function(id, done) {
            console.log('AUTH: deserializeUser');
      
            userModel.findOne({_id:id}, function (err, user) {
              done(err, user);
            });
        });
    }
})();