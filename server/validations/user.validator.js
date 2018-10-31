(function() {
    'use strict';
    const userModel = require('../models/User.model');
    const validationHelper = require('../helpers/helper.validation');
    const emailValidator = require('./email.validator');
    const userRequiredFields = ['firstName', 'lastName', 'userName', 'emailAddress', 'password'];

    exports.isAdmin = validationHelper.isAdmin;

    exports.userCreateValidator = async function validateBeforeUserCreate(userData) {
        var validation = {};
        validation = validationHelper.isRequestBodyEmpty(userData, 'create', 'user');
        if (validation.error) {
            return validation;
        }
        validation = validationHelper.validateRequiredFields(userData, userRequiredFields);
        if (validation.error) {
            return validation;
        }

        // Check if given email address is valid, if not valid return error message.
        validation = validateEmailAddress(userData.emailAddress);
        if (validation.error) {
            return validation;
        }

        // Check if username/emailaddress already exists, if so return error message.
        try {
            var existingUser = await userModel.find({
                $or: [
                   { userName: userData.userName },
                   { emailAddress: userData.emailAddress }
                ]
            });
            if (existingUser.length > 0) {
                return { error: true, message: 'Username/Email Address already exists.'};
            } else {
                return { error: false };
            }
        }
        catch(err) {
            return { error: true, message: err };
        }
    }

    exports.userUpdateValidator = async function validateBeforeUserUpdate(userData, userId) {
        var validation = validationHelper.isRequestBodyEmpty(userData, 'update', 'user');
        if (validation.error) {
            return validation;
        }
        if (userData.emailAddress) {
            var validation = validateEmailAddress(userData.emailAddress);
            if (validation.error) {
                return validation;
            }
        }
        // Check whether given username or email address already exists in different id.
        if (userData.userName || userData.emailAddress) {
            try {
                var existingUser = await userModel.find({
                    $or: [
                       { userName: userData.userName },
                       { emailAddress: userData.emailAddress }
                    ]
                });
                // If same username exists in different id, then return message as username exists.
                if (Object.keys(existingUser).length && existingUser[0].id !== userId) {
                    return { error: true, message: 'Username/Email address already exists.'};
                }
            }
            catch(error) {
                return {error: true, message: error};
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
})();