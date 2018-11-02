const express = require('express');
const router = express.Router();
const uploads = require('../controllers/uploads');
const productImageUpload = require('../config/productImageUpload');


// Upload Routes
//router.route('/files').post(uploads.uploadFiles);
router.post('/files', productImageUpload.diskStorage, uploads.uploadFiles);

router.route('/upload-form').get(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/routes/uploads/files" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="productImage"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

module.exports = router;