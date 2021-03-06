(function() {
    const jwt = require('jsonwebtoken');
    const secret = 'welcome-to-product-catalgue';

    var getToken = function (headers) {
        if (headers && headers.authorization) {
          var authorization = headers.authorization;
          var part = authorization.split(' ');
    
          if (part.length === 2) {
            var token = part[1];
            return token;
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
    };

    var createToken = function(data, req) {
        if (data) {
            var user = data;
            var token = jwt.sign({
              _id: user._id,
              roles: user.roles,
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName
            }, secret, {expiresIn: 60 * 75});
            if (token) {
              console.log('Token assigned');
            }
            return token;
        } else {
            return null;
        }
    };

    // Middleware for token Creation
    exports.createToken = function (jwtclaims, req) {
        if (jwtclaims) {
        return createToken(jwtclaims, req);
        } else {
        return null;
        }
    };

    exports.decodeToken = function (req, next) {
        var decoded;
        var token = '';
        if ('object' !== typeof req && !req.headers) {
          token = req;
        } else if(req && req.headers ) {
          token = getToken(req.headers);
        } else {
          token = '';
        }
        if (token) {
          try {
            decoded = jwt.decode(token, secret);
          } catch (err) {
            next(new Error('Invalid token!'));
          }
          if (decoded) {
            // everything went fine - save userId as property of given connection instance
            next(null, decoded);
          } else {
            // invalid token - terminate the connection
            next(new Error('Invalid token!'));
          }
        } else {
          return next();
        }
    };

    exports.verifyToken = function(req, res) {
      var token = '';
      if (req && req.headers) {
        token = getToken(req.headers);
      }
      if (token) {
        try {
          var decodedUser = jwt.verify(token, secret);
          req.userData = decodedUser;
        }
        catch(e) {
          console.log('error', e);
          throw new Error(e.message);
          //res.status(500).send({name: e.name, message: e.message});
        }
      }
      else {
        throw new Error('Please provide the token.');
      }
    }
})();