(function() {
    'use strict';

    const productModel = require('../models/Product.model');
    const productRequiredFields = ['productName', 'price', 'productsku'];

    exports.isAdmin = function isCurrentUserAdminRole(req) {
        var isAdmin = false;
        if (req.userData && req.userData.roles.indexOf('administrator') !== -1) {
            isAdmin = true;
        }
        return isAdmin;
    }

    exports.productCreateValidator = async function validateBeforeProductCreate(productData) {
        var validation = {};
        validation = isRequestBodyEmpty(productData, 'create', 'product');
        if (validation.error) {
            return validation;
        }
        validation = validateRequiredFields(productData);
        if (validation.error) {
            return validation;
        }
        // Check if productsku already exists, if so return error message.
        try {
            var product = await productModel.find({productsku: productData.productsku});
            if (product.length > 0) {
                console.log('product exists', product);
                return { error: true, message: 'Product already exists.'};
            } else {
                return { error: false };
            }
        }
        catch(err) {
            return { error: true, message: err };
        }
    }

    exports.productUpdateValidator = async function validateBeforeProductUpdate(productData, productId) {
        var validation = isRequestBodyEmpty(productData, 'update', 'product');
        if (validation.error) {
            return validation;
        }
        console.log('product data', Object.keys(productData).length);
        if (productData.productsku) {
            try {
                var existingProduct = await productModel.find({productsku: productData.productsku});
                // If same productsku exists in different id, then return message as product exists.
                if (Object.keys(existingProduct).length && existingProduct[0].id !== productId) {
                    return { error: true, message: 'Product sku already exists.'};
                }
            }
            catch(error) {
                return {error: true, message: error};
            }
        }
        return { error: false };
    }

    function validateRequiredFields(productData) {
        var requiredError = [];
        for (var productField in productRequiredFields) {
            console.log('productfield', productField);
            var fieldName = productRequiredFields[productField];
            if (!productData[fieldName]) {
                requiredError.push(fieldName + ' is required.');
            }
        }
        if (requiredError.length > 0) {
            return {
                error: true,
                message: requiredError
            }
        }
        return { error: false };
    }

    function isRequestBodyEmpty(data, method, entity) {
        var operation = method === 'create' ? 'create ' + entity : 'update ' + entity;
        if (Object.keys(data).length <= 0) {
            return {
                error: true,
                message: 'Please send atleast one field to ' + operation,
            };
        }
        return { error: false };
    }

})();