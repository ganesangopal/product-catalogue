(function() {
    'use strict';
    const productValidator = require('../validations/product.validator');
    const productService = require('../services/products');

    /**
     * @api {GET} /routes/products Get All Products
     * @apiName getAllProducts
     * @apiGroup Product
     * @apiPermission Authenticated user
     *
     * @apiDescription Only Authenticated user can get all the products info.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/products
     *
     *
     * @apiSampleRequest /routes/products
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "productName": "Test Product",
     *  "price": 234,
     *  "productsku": "YUIOP",
     *  "productImage": "./src/assets/products/xxxx"
     * }
     * 
     */
    exports.getAllProducts = (req, res) => {
        productService.getAllProducts(req, res);
    };

    /**
     * @api {POST} /routes/products Create Product
     * @apiName postProduct
     * @apiGroup Product
     * @apiPermission Admin User.
     *
     * @apiDescription Create new Product.
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/products
     *
     * @apiParam {String} productName Name of Product
     * @apiParam {String} price Price of Product
     * @apiParam {String} productsku Product sku of Product
     * @apiParam {File} productImage Image of Product (optional)
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "productName":"Test product",
     *  "price"; 244,
     *  "productsku":"YUIOP"
     * }
     *
     * @apiSampleRequest /routes/products
     * @apiSuccess {String} _id ID of the Product.
     * @apiSuccess {String} productName Name of Product
     * @apiSuccess {String} price Price of Product
     * @apiSuccess {String} productsku Product sku of Product
     * @apiSuccess {File} productImage Image of Product
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "productName":"Test product",
     *  "price"; 244,
     *  "productsku":"YUIOP",
     *  "productImage": "./src/assets/products/xxxx"
     * }
     * 
     **/
    exports.createProduct = (req, res) => {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            productValidator.productCreateValidator(req.body, function(err, errCode) {
                if (err) {
                    return res.status(errCode).send(err);
                }
                productService.createProduct(req, res);
            });
        } else if (!isAdmin) {
            res.status(401).send('Not authorised to create product.');
        } else {
            res.status(400).send({error: 'Bad request'});
        }
    };

    /**
     * @api {GET} /routes/products/:id Get Product By Id
     * @apiName getProductById
     * @apiGroup Product
     * @apiPermission Authenticated user
     *
     * @apiDescription Only Authenticated user can get the product by id.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/products/:id
     *
     * @apiParam {String} id productId of the Product
     *
     * @apiParamExample {json} Get-Example:
     * {
     *  "id" : "559exxxxxxxxx3e7"
     * }
     *
     * @apiSampleRequest /routes/products/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "productName":"Test product",
     *  "price"; 244,
     *  "productsku":"YUIOP",
     *  "productImage": "./src/assets/products/xxxx"
     * }
     * 
     */
    exports.getProductById = (req, res) => {
        productService.getProductById(req, res);
    };

    /**
     * @api {PUT} /routes/products/:id/ Update Product
     * @apiName updateProduct
     * @apiGroup Product
     * @apiPermission Admin User
     *
     * @apiDescription Admin user can able to update the products data.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/products/:id
     *
     * @apiParam {String} id ID of the Product.
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "productName":"Test product",
     *  "price"; 244,
     *  "productsku":"YUIOP"
     * }
     *
     * @apiSampleRequest routes/products/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "productName":"Test product",
     *  "price"; 244,
     *  "productsku":"YUIOP"
     * }
     * 
     */
    exports.updateProduct = (req, res) => {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin) {
            productService.updateProduct(req, res);
        } else {
            res.status(401).send('Not Authorized to update the product.');
        }
    };

    /**
     * @api {DELETE} /routes/products/:id Delete Product
     * @apiName deleteProductById
     * @apiGroup Product
     * @apiPermission Admin
     *
     * @apiDescription Only Admin user can allow to delete product by id
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/products/:id
     *
     * @apiParam {String} id Id of the Product
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "id" : "559e6d56031e2d7c294783e7"
     * }
     *
     * @apiSampleRequest /routes/products/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "message": "Successfully deleted"
     * }
     *
     */
    exports.deleteProduct = function (req, res) {
        var isAdmin = productValidator.isAdmin(req);
        if (isAdmin) {
            productService.deleteProduct(req, res);
        } else {
            res.status(401).send('Not Authorized to delete the product.');
        }
    };
})();