const tokenManager = require('../config/tokenManager');
const passport = require('passport');

/**
 * @api {POST} /routes/login User Login
 * @apiName login
 * @apiGroup User
 * @apiPermission None
 *
 * @apiDescription Login API
 *
 * @apiExample Example usage:
 * curl -i http://localhost/routes/login
 *
 *
 * @apiParamExample {json} Post-Example:
 * {
 *  "userName" : "test",
 *  "password": "test123"
 * }
 *
 * @apiSampleRequest /routes/login
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "success": "true",
 *   "token": "eYxxxxxxxxxxIHYU"
 * }
 *
 */
exports.login = (req, res, next) => {
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