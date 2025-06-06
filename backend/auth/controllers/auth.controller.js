const AuthService = require('../services/auth.service');
const { generateOTP, storeOTP, verifyOTP } = require('../services/otp.service');
const { sendOTPEmail, sendPasswordEmail } = require('../services/mail.service');
const pool = require('../config/dbConfig');

class AuthController {
    async register(req, res) {
        console.log('Registering user...');
        console.log('Request body:', req.body);
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
        const { uid } = req.params;
        console.log("Logging in requestOTP with uid:", uid);
        const emailres = await pool.query('SELECT email FROM users WHERE uid = ?', [uid]);
        if (emailres[0].length === 0) {
            return res.status(400).json({ message: 'User not found.' });
        }
        console.log("Logging in requestOTP with uid:", emailres);
        const email = emailres[0].email;
        console.log("Logging in requestOTP with email:", email);
        const otp = generateOTP();
        storeOTP(email, otp, 120); // tồn tại 2 phút

        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP đã được gửi.' });
        }

    async verifyOTPCode(req, res) {
        const {uid} = req.params;
        console.log("Logging in verifyOTPCode with uid:", uid);
        if (!uid) {
            return res.status(400).json({ message: 'Missing user ID.' });
        }
        const { otp } = req.body;
        const emailres = await pool.query('SELECT email FROM users WHERE uid = ?', [uid]);
        if (emailres.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const email = emailres[0].email;
        const isValid = verifyOTP(email, otp);

        if (!isValid) return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn.' });
        const updateres = await pool.query('UPDATE users SET status = ? WHERE uid = ?', [1, uid]);
        console.log(updateres)
        res.status(200).json({ message: 'OTP hợp lệ.' });
    }

    async changePassword(req, res) {
        const { uid, oldPassword, newPassword } = req.body;

        try {
            const result = await AuthService.changePassword({ uid, oldPassword, newPassword });
            res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.', data: result });
        } catch (error) {
            console.error('Error during password change:', error);
            res.status(400).json({ message: error.message });
        }
    }
    
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const subpassword = await AuthService.sendPasswordResetEmail(email);
            await sendPasswordEmail(email, subpassword);
            res.status(200).json({ message: 'Mật khẩu mới đã được gửi qua email.' });
        } catch (error) {
            console.error('Error during password reset:', error);
            res.status(500).json({ message: 'An error occurred while resetting the password.' });
        }
    }
}

module.exports = new AuthController();