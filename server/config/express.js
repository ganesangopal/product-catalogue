(function() {
    'use strict';
    const passport = require('passport');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');

    module.exports = function(app) {
        console.log('express included');
        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extended: false}));
        app.use(bodyParser.json());
        app.use(session({ 
            secret: 'anything',
            key: 'sid',
            resave: false, 
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());
    }

})();