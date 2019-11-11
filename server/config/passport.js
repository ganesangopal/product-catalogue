(function () {
    'use strict';
    var passport = require('passport'),
    //   path = require('path'),
    //   config = require('./config'),
      User = require('../models/User.model');
  
    module.exports = function() {
        console.log('passport methods entered');
      passport.serializeUser(function(user, done) {
          console.log('user serialize', user);
        if(user) {
            console.log('user serialized', user);
          done(null, user._id);
        }
      });
  
      passport.deserializeUser(function(id, done) {
          console.log('deserialize middleware');
        User.findOne({_id:id}).exec(function(err, user) {
          if(user) {
              console.log('user deserialized', user);
            return done(null, user);
          } else {
              console.log('user not found');
            return done(null, false);
          }
        });
      });
  
    //   // Initialize strategies
    //   config.getGlobbedFiles('./server/config/strategies/*.js').forEach(function(strategy) {
    //     require(path.resolve(strategy))();
    //   });
      require('./strategies/passport-local-strategy')();
      require('./strategies/google')();
    };
  }());
  