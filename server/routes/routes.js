const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    console.log('Logging of request url ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/').get((req, res) => {
    res.send('Router works');
});

// Auth Routes
router.route('/login').post(auth.login);

module.exports = router;