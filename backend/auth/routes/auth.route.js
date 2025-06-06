const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authenticate = require('../../middlewares/authentication');
const authorize = require('../../middlewares/authorization');

const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 10,                  // tối đa 5 request
  message: 'Quá nhiều yêu cầu OTP. Hãy thử lại sau.'
});

const router = express.Router();
const { validate } = require('../../middlewares/validation');

router.post('/register', validate(), AuthController.register);
router.post('/login', AuthController.login);
router.post('/otp/request/:uid', otpLimiter, AuthController.requestOTP);
router.post('/otp/verify/:uid', AuthController.verifyOTPCode);


module.exports = router;