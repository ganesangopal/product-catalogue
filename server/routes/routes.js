const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const tokenManager = require('../config/tokenManager');
const user = require('../controllers/users');

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request url ' + req.url);
    if (req && req.headers['x-api-key'] && typeof req.headers['x-api-key'] === 'string') {
        req.headers.authorization = req.headers['x-api-key'];
    }
    var methods = ['POST', 'PUT', 'DELETE'];
    if (methods.includes(req.method) && req.url !== '/login' && req.url !== '/logout') {
        tokenManager.verifyToken(req, res);
    }
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