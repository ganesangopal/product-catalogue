const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

// User Routes
router.route('/').get(users.getAllUsers);

router.route('/').post(users.createUser);

router.route('/:id').get(users.getUserById);

router.route('/name/:name').get(users.getUserByName);

router.route('/:id').put(users.updateUser);

router.route('/:id').delete(users.deleteUser);

module.exports = router;