const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authenticate = require('../../middlewares/authentication');
const authorize = require('../../middlewares/authorization');
const router = express.Router();
const { validate } = require('../../middlewares/validation');
router.post('/register', validate(), AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;