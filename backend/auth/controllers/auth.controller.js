const AuthService = require('../services/auth.service');
const { generateOTP, storeOTP, verifyOTP } = require('../services/otp.service');
const { sendOTPEmail } = require('../services/mail.service');
const pool = require('../config/dbConfig');

class AuthController {
    async register(req, res) {
        try {
            const userData = req.body;
            console.log('Registering user with data:', userData);
            const result = await AuthService.registerUser(userData);
            res.status(201).json({ message: 'User registered successfully', data: result });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const userData = req.body;
            const result = await AuthService.loginUser(userData);
            res.status(200).json({ message: 'Login successful', token: result.token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(400).json({ message: error.message });
        }
    }

    async requestOTP(req, res) {
        const { email } = req.body;

        const otp = generateOTP();
        storeOTP(email, otp, 120); // tồn tại 2 phút

        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP đã được gửi.' });
        }

    async verifyOTPCode(req, res) {
        const { email, otp } = req.body;

        const isValid = verifyOTP(email, otp);

        if (!isValid) return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn.' });
        await pool.query('UPDATE users SET status = ? WHERE email = ?', [1, email]);
        res.status(200).json({ message: 'OTP hợp lệ.' });
    }
}

module.exports = new AuthController();