const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// Getting our routes.
const routes = require('./server/routes/routes');
const userRoutes = require('./server/routes/users');
const productRoutes = require('./server/routes/products');
const uploadRoutes = require('./server/routes/uploads');

// Using middleware.
app.use(express.static(path.join(__dirname, 'dist/product-catalogue')));
require('./server/config/express')(app);
require('./server/config/passport')();

mongoose.connect('mongodb://localhost/productsCatalogue', {useNewUrlParser: true});

app.use(cors());
app.use('/routes', routes);
app.use('/routes/users', userRoutes);
app.use('/routes/products', productRoutes);
app.use('/routes/uploads', uploadRoutes);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { 
      scope: ['https://www.googleapis.com/auth/plus.login'],
      failureRedirect: '/login'
    }, function(err, user, info) {
        if (err) {
            console.log(err);
        }
    }),
  function(req, res) {
      console.log('came here first callback');
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('came here');
        //res.status(200).send({message: 'Authenticated'});
        res.redirect('/products');
        res.end();
    });

// Catch all other routes request and return it to the index.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/product-catalogue/index.html'));
});

// Getting port from env if available.
const port = process.env.PORT || 4600;
app.listen(port, (req, res) => {
    console.log(`Running server ${port}`);
});