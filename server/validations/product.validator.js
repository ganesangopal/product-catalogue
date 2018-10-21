(function() {
    'use strict';

    const productModel = require('../models/Product.model');
    const validationHelper = require('../helpers/helper.validation');
    const productRequiredFields = ['productName', 'price', 'productsku'];

    exports.isAdmin = validationHelper.isAdmin;

    exports.productCreateValidator = async function validateBeforeProductCreate(productData) {
        var validation = {};
        validation = validationHelper.isRequestBodyEmpty(productData, 'create', 'product');
        if (validation.error) {
            return validation;
        }
        validation = validationHelper.validateRequiredFields(productData, productRequiredFields);
        if (validation.error) {
            return validation;
        }
        // Check if productsku already exists, if so return error message.
        try {
            var product = await productModel.find({productsku: productData.productsku});
            if (product.length > 0) {
                console.log('product exists', product);
                return { error: true, message: 'Product sku already exists.'};
            } else {
                return { error: false };
            }
        }
        catch(err) {
            return { error: true, message: err };
        }
    }

    exports.productUpdateValidator = async function validateBeforeProductUpdate(productData, productId) {
        var validation = validationHelper.isRequestBodyEmpty(productData, 'update', 'product');
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

})();