(function() {
    'use strict';

    exports.isAdmin = function isCurrentUserAdminRole(req) {
        var isAdmin = false;
        if (req.userData && req.userData.roles.indexOf('administrator') !== -1) {
            isAdmin = true;
        }
        return isAdmin;
    }

    exports.isRequestBodyEmpty = function isRequestBodyEmpty(data, method, entity) {
        var operation = method === 'create' ? 'create ' + entity : 'update ' + entity;
        if (Object.keys(data).length <= 0) {
            return {
                error: true,
                message: 'Please send atleast one field to ' + operation,
            };
        }
        return { error: false };
    }

    exports.validateRequiredFields = function validateRequiredFields(data, requiredFields) {
        var requiredError = [];
        for (var index in requiredFields) {
            var fieldName = requiredFields[index];
            if (!data[fieldName]) {
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

})();