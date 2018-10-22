const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

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

//app.use(cors());
app.use('/routes', routes);
app.use('/routes/users', userRoutes);
app.use('/routes/products', productRoutes);
app.use('/routes/uploads', uploadRoutes);

// Catch all other routes request and return it to the index.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/product-catalogue/index.html'));
});

// Getting port from env if available.
const port = process.env.PORT || 4600;
app.listen(port, (req, res) => {
    console.log(`Running server ${port}`);
});