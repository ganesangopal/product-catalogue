const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const tokenManager = require('../config/tokenManager');
const user = require('../controllers/users');

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request url ' + req.url);
    var methods = ['GET', 'POST', 'PUT', 'DELETE'];
    var ignorePaths = ['/login', '/logout'];
    if (methods.includes(req.method) && !ignorePaths.includes(req.url)) {
        tokenManager.verifyToken(req, res);
    }
    console.log('valid input');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/').get((req, res) => {
    res.send('Router works');
});

// Auth Routes
router.route('/login').post(auth.login);
router.route('/logout').post(function(req,res) {
    req.logout();
    res.end();
});

module.exports = router;