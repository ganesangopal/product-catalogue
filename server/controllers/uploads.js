(function() {
    'use strict';

    /**
     * @api {POST} /routes/uploads/files Upload File
     * @apiName fileUpload
     * @apiGroup File
     * @apiPermission Admin
     *
     * @apiDescription Only Admin user can upload file
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/uploads/files
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "productImage" : "[File]"
     * }
     *
     * @apiSampleRequest /routes/products/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "File uploaded successfully"
     * }
     *
     */
    exports.uploadFiles = (req, res) => {
        if (req.body) {
            res.json('File uploaded successfully');
        }
    };
})();
