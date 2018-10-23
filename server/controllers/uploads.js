(function() {
    'use strict';

    const multer = require('multer');
    const path = require('path');


    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./src/assets");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

    var fileFilter = function(req, file, cb) {
        if (path.extname(file.originalname) !== '.pdf') {
          return cb(new Error('Only pdfs are allowed'));
        }
    
        cb(null, true);
    };

    var upload = multer({
        storage: Storage,
        fileFilter: fileFilter
    }); //Field name and max count

    exports.diskStorage = upload.array('file', 3);

    exports.uploadFiles = (req, res) => {
        //console.log(req.files);
        res.send('File uploaded successfully');
    };
})();
