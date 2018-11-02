(function() {
    const userValidator = require('../validations/user.validator');
    const userService = require('../services/users');

    /**
     * @api {GET} /routes/users/:id Get All Users
     * @apiName getAllUsers
     * @apiGroup User
     * @apiPermission Authenticated user
     *
     * @apiDescription Only Authenticated user can get all the user info.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users
     *
     *
     * @apiSampleRequest /routes/users
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "firstName": "Test",
     *  "lastName": "User",
     *  "username": "test",
     *  "emailAddress": "test@example.com"
     *  "roles": []
     * }
     * 
     */
    exports.getAllUsers = (req, res) => {
        console.log('Request object',req.user);
        userService.getAllUsers(req, res);
    };

    /**
     * @api {POST} /routes/users Create User
     * @apiName postUsers
     * @apiGroup User
     * @apiPermission Admin User.
     *
     * @apiDescription Create new User.
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users
     *
     * @apiParam {String} username Username of User
     * @apiParam {String} password Password of User
     * @apiParam {String} [firstName] FirstName of User
     * @apiParam {String} [lastName] LastName of User
     * @apiParam {String} [emailAddress] Email Address of User
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "userName":"test",
     *  "password"; "test123",
     *  "firstName":"Test",
     *  "lastName":"User",
     *  "emailAddress": "test@example.com"
     * }
     *
     * @apiSampleRequest /routes/users
     * @apiSuccess {String} _id ID of the User.
     * @apiSuccess {String} userName Username of User
     * @apiSuccess {String} password Password of User
     * @apiSuccess {String} firstName FirstName of User
     * @apiSuccess {String} lastName LastName of User
     * @apiSuccess {String[]} roles Roles of User
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "firstName": "Test",
     *  "lastName": "User",
     *  "username": "test",
     *  "emailAddress": "test@example.com"
     *  "roles": []
     * }
     * 
     **/
    exports.createUser = async (req, res, next) => {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin && Object.keys(req.body).length > 0) {
            userValidator.userCreateValidator(req.body).then((validation) => {
                if (validation.error) {
                    res.status(400).send(validation.message);
                } else {
                    userService.createUser(req, res);
                }
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else if (!isAdmin) {
            res.status(401).send('UnAuthorized for creating user.');
        } else {
            res.status(400);
        }
    };

    /**
     * @api {GET} /routes/users/:id Get User By Id
     * @apiName getUserById
     * @apiGroup User
     * @apiPermission Authenticated user
     *
     * @apiDescription Only Authenticated user can get the user by id.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users/:id
     *
     * @apiParam {String} id userId of the User
     *
     * @apiParamExample {json} Get-Example:
     * {
     *  "id" : "559exxxxxxxxx3e7"
     * }
     *
     * @apiSampleRequest /routes/users/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "firstName": "Test",
     *  "lastName": "User",
     *  "username": "test",
     *  "emailAddress": "test@example.com"
     *  "roles": []
     * }
     * 
     */
    exports.getUserById = (req, res) => {
        userService.getUserById(req, res);
    };

    /**
     * @api {GET} /routes/users/:name Get User By Name
     * @apiName getUserByName
     * @apiGroup User
     * @apiPermission Authenticated user
     *
     * @apiDescription Only Authenticated user can get the user by name.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users/:name
     *
     * @apiParam {String} name userName of the User
     *
     * @apiParamExample {json} Get-Example:
     * {
     *  "name" : "test"
     * }
     *
     * @apiSampleRequest /routes/users/:name
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "_id": "559e6d56031e2d7c294783e7",
     *  "firstName": "Test",
     *  "lastName": "User",
     *  "username": "test",
     *  "emailAddress": "test@example.com"
     *  "roles": []
     * }
     * 
     */
    exports.getUserByName = (req, res) => {
        userService.getUserByName(req, res);
    };

    /**
     * @api {PUT} /routes/users/:id/ Update User
     * @apiName updateUser
     * @apiGroup User
     * @apiPermission Admin User
     *
     * @apiDescription Admin user can able to update the other users data.
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users/:id
     *
     * @apiParam {String} id ID of the User.
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "userName":"test",
     *  "password"; "test123",
     *  "firstName":"Test",
     *  "lastName":"User",
     *  "emailAddress": "test@example.com"
     * }
     *
     * @apiSampleRequest routes/users/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *    "_id": "559e6d56031e2d7c294783e7",
     *    "firstName": "Test",
     *    "lastName": "User",
     *    "username": "test",
     *    "emailAddress": "test@example.com"
     *    "roles": []
     * }
     * 
     */
    exports.updateUser = (req, res) => {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
            userService.updateUser(req, res);
        } else {
            res.status(401).send('Not authorized to update the user.');
        }
    };

    /**
     * @api {DELETE} /routes/users/:id Delete User
     * @apiName deleteUserById
     * @apiGroup User
     * @apiPermission Admin
     *
     * @apiDescription Only Admin user can allow to delete user by id
     *
     * @apiExample Example usage:
     * curl -i http://localhost/routes/users/:id
     *
     * @apiParam {String} id Id of the User
     *
     * @apiParamExample {json} Post-Example:
     * {
     *  "id" : "559e6d56031e2d7c294783e7"
     * }
     *
     * @apiSampleRequest /routes/users/:id
     *
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "message": "Successfully deleted"
     * }
     *
     */
    exports.deleteUser = function (req, res) {
        var isAdmin = userValidator.isAdmin(req);
        if (isAdmin) {
            userService.deleteUser(req, res);
        } else {
            res.status(401).send('Not Authorized to delete the user.');
        }

    };
})();