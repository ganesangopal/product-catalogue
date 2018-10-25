(function() {
    'use strict';

    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');


    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            console.log('file details', file);
            callback(null, "./src/assets/tmp");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    });

    var fileFilter = function(req, file, cb) {
        // if (path.extname(file.originalname) !== '.pdf') {
        //   return cb(new Error('Only pdfs are allowed'));
        // }
    
        cb(null, true);
    };

    var upload = multer({
        storage: Storage,
        fileFilter: fileFilter
    }); //Field name and max count
    //console.log('upload details', upload.array('file', 3));
    exports.diskStorage = upload.single('productImage');

    exports.uploadFiles = (req, res) => {
        console.log('request file', req.files);
        console.log('request file single', req.file);
        console.log('request body', req.body);
        req.session.tmpfile = req.file;
    //     var fstream;
    // req.pipe(req.busboy);
    // req.busboy.on('file', function (fieldname, file, filename) {
    //     console.log("Uploading: " + filename); 
    //     fstream = fs.createWriteStream(__dirname + '/files/' + filename);
    //     file.pipe(fstream);
    //     fstream.on('close', function () {
    //         res.redirect('back');
    //     });
    // });
        res.json('File uploaded successfully');
    };
})();
