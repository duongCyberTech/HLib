const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authenticate = require('../../middlewares/authentication');

const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 10,                  // tối đa 5 request
  message: 'Quá nhiều yêu cầu OTP. Hãy thử lại sau.'
});

const router = express.Router();
const { validate } = require('../../middlewares/validation');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/register', validate(), AuthController.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Tài khoản hoặc mật khẩu không đúng
 */
router.post('/login', AuthController.login);
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
router.post('/otp/request', otpLimiter, AuthController.requestOTP);
/**
 * @swagger
 * /api/auth/otp/verify:
 *   post:
 *     summary: Xác thực mã OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otpCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xác thực thành công
 */
router.post('/otp/verify', AuthController.verifyOTPCode);
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Yêu cầu thành công
 */
router.post('/forgot-password', AuthController.forgotPassword);
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 */
router.post('/reset-password', authenticate, AuthController.changePassword);

module.exports = router;