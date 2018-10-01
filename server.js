const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Getting our POSTS routes.
const routes = require('./server/routes/routes');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// Using middleware.
app.use(express.static(path.join(__dirname, 'dist/product-catalogue')));
app.use(cors());
app.use('/routes', routes);

// Catch all other routes request and return it to the index.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/product-catalogue/index.html'));
});

// Getting port from env if available.
const port = process.env.PORT || 4600;
app.listen(port, (req, res) => {
    console.log(`Running server ${port}`);
});