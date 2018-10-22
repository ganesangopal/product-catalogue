const express = require('express');
const router = express.Router();
const uploads = require('../controllers/uploads');

const multer = require('multer');


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./src/assets");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}); //Field name and max count
// Upload Routes
//router.route('/files').post(uploads.uploadFiles);
router.post('/files', upload.array('file', 3), uploads.uploadFiles);

router.route('/upload-form').get(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="/routes/uploads/files" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="file"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

module.exports = router;