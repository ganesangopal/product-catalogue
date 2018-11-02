(function() {
    'use strict';

    const multer = require('multer');
    const path = require('path');
    const config = require('../config/config');

    // Get the diskStorage object
    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log('file details', file);
            callback(null, "./" + config.productTmpImgDir);
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

    // File extension validation function.
    var fileFilter = function(req, file, cb) {
        var fileExtensions = ['.png', '.jpg'];
        console.log('file', path.extname(file.originalname));
        if (file && fileExtensions.indexOf(path.extname(file.originalname)) === -1) {
          return cb(new Error('Only image with png or jpg extensions are allowed'));
        }
        console.log('body', req.body);
        console.log('file', file);
    
        cb(null, true);
    };

    var upload = multer({
        storage: Storage,
        fileFilter: fileFilter
    });

    exports.diskStorage = upload.single('productImage');

})();