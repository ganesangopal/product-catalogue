(function() {
    'use strict';

    const async = require('async');
    const productModel = require('../models/Product.model');
    const validationHelper = require('../helpers/helper.validation');
    const productRequiredFields = ['productName', 'price', 'productsku'];

    exports.isAdmin = validationHelper.isAdmin;

    exports.productCreateValidator = function validateBeforeProductCreate(productData, callback) {
        var validation = {};
        console.log('validation error', validation);
        async.waterfall([
            function(callback) {
                validation = validationHelper.validateRequiredFields(productData, productRequiredFields);
                if (validation.error) {
                    return callback(validation.message, 400);
                }
                callback();
            },
            function(callback) {
                validationHelper.validateProductSku(productData, null, function(err, errCode) {
                    if (err) {
                        return callback(err, errCode);
                    }
                    callback(null, null);
                });
            }
        ], function(err, errCode) {
            callback(err, errCode);
        });
    }

    exports.productUpdateValidator = function validateBeforeProductUpdate(productData, productId, callback) {
        async.waterfall([
            function(callback) {
                var validation = validationHelper.isRequestBodyEmpty(productData, 'update', 'product');
                if (validation.error) {
                    return callback(validation.message);
                }
                callback(null);
            },
            function(callback) {
                validationHelper.validateProductSku(productData, productId, function(err, errCode) {
                    if (err) {
                        return callback(err, errCode);
                    }
                    callback(null, null);
                });
            }
        ], function(err, errCode) {
                callback(err, errCode);
        });
    }

})();