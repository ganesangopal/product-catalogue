(function() {
    'use strict';
    var socialConfig = require('../socialconfig');
    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var userModel = require('../../models/User.model');

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    module.exports = function() {
        passport.use(new GoogleStrategy({
            clientID: socialConfig.google.clientID,
            clientSecret: socialConfig.google.clientSecret,
            callbackURL: socialConfig.google.callbackURL
            },
            function(accessToken, refreshToken, profile, done) {
                // userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return done(err, user);
                // });
                console.log(profile);
                return done(null, profile);
                // userModel.findOneAndUpdate({
                //     query: { googleId: profile.id },
                //     update: {
                //       $setOnInsert: { googleId: profile.id }
                //     },
                //     new: true,   // return new doc if one is upserted
                //     upsert: true // insert the document if it does not exist
                // }, function (err, user) {
                //     return done(err, user);
                // });
            }
        ));
    };
})();