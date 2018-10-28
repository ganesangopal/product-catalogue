(function() {
    'use strict';

    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');
    const config = require('../config/config');


    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log('file details', file);
            callback(null, "./" + config.productTmpImgDir);
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

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
    }); //Field name and max count
    //console.log('upload details', upload.array('file', 3));
    exports.diskStorage = upload.single('productImage');

    exports.uploadFiles = (req, res) => {
        if (req.body) {
            res.json('File uploaded successfully');
        }
        // console.log('request file', req.files);
        // console.log('request file single', req.file);
        // console.log('request body', req.body);
        // //req.session.tmpfile = req.file;
        // var newPath = './src/assets/products/' + req.bo.filename;
        // fs.rename(req.file.path, newPath, function(err) {
        //     console.log('came to fs');
        //     fs.stat(newPath, (err, stats) => {
        //         if (err) {
        //             res.status(500).send(err);
        //         } else {
        //             fs.unlink(req.file.path, function(err) {
        //                 if (err) {
        //                     res.status(500).send(err);
        //                 } else {
        //                     res.json('File uploaded successfully');
        //                 }
        //             });
        //         }
        //     });
        // });
    };
})();
