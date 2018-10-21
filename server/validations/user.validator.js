(function() {
    'use strict';
    const userModel = require('../models/User.model');
    const emailValidator = require('./email.validator');
    const userRequiredFields = ['firstName', 'lastName', 'userName', 'emailAddress', 'password'];
    exports.isAdmin = function isCurrentUserAdminRole(req) {
        var isAdmin = false;
        if (req.userData && req.userData.roles.indexOf('administrator') !== -1) {
            isAdmin = true;
        }
        return isAdmin;
    }

    exports.userCreateValidator = async function validateBeforeUserCreate(userData) {
        var validation = {};
        validation = isRequestBodyEmpty(userData, 'create', 'user');
        if (validation.error) {
            return validation;
        }
        validation = validateRequiredFields(userData);
        if (validation.error) {
            return validation;
        }
        // Check if username already exists, if so return error message.
        try {
            var user = await userModel.find({userName: userData.userName});
            if (user.length > 0) {
                console.log('user exists', user);
                return { error: true, message: 'Username already exists.'};
            } else {
                return { error: false };
            }
        }
        catch(err) {
            return { error: true, message: err };
        }
        // Check if given email address is valid, if not valid return error message.
        validation = validateEmailAddress(userData.emailAddress);
        return validation;
    }

    exports.userUpdateValidator = async function validateBeforeUserUpdate(userData, userId) {
        var validation = isRequestBodyEmpty(userData, 'update', 'user');
        if (validation.error) {
            return validation;
        }
        if (userData.userName) {
            try {
                var existingUser = await userModel.find({userName: userData.userName});
                // If same username exists in different id, then return message as username exists.
                if (Object.keys(existingUser).length && existingUser[0].id !== userId) {
                    return { error: true, message: 'Username already exists.'};
                }
            }
            catch(error) {
                return {error: true, message: error};
            }
        }
        if (userData.emailAddress) {
            var validation = validateEmailAddress(userData.emailAddress);
            return validation;
        }
        return { error: false };
    }

    function validateRequiredFields(userData, validation) {
        var requiredError = [];
        for (var userField in userRequiredFields) {
            console.log('userfield', userField);
            var fieldName = userRequiredFields[userField];
            if (!userData[fieldName]) {
                requiredError.push(fieldName + ' is required.');
                //console.log(fieldName + ' is required.');
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

    function validateEmailAddress(emailAddress) {
        if (!emailValidator.validate(emailAddress)) {
            return { error: true, message: 'Invalid email address.' };
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