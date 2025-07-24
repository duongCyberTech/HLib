const AuthService = require('../services/auth.service');
const { generateOTP, storeOTP, verifyOTP } = require('../services/otp.service');
const { sendOTPEmail, sendPasswordEmail } = require('../services/mail.service');
const pool = require('../config/dbConfig');
const {checkExist} = require('../utils/checkExist');

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
        const { uid } = req.body;
        const {email} = req.body;
        console.log("Check Request 1 ---", uid, email);
        const checkUp = await checkExist('users', 'uid', uid) || await checkExist('users', 'email', email);
        if (!checkUp) {
            return res.status(400).json({ message: 'User not found.' });
        }
        var emailres;

        if (!email){
            const resp = await pool.query('SELECT email FROM users WHERE uid = ?', [uid]);
            console.log("Email result:", resp);
            emailres = resp[0][0].email;
            console.log("Email result:", emailres);
            if (resp.length === 0) {
                return res.status(400).json({ message: 'User not found.' });
            }
        }

        console.log("Check Request 2 ---")
        console.log("Pair email:", email, "emailres:", emailres);
        const email_ =  (email && email !== undefined && typeof email !== 'undefined')  ? email : emailres;
        console.log("Logging in requestOTP with email:", email_);
        if (!email_) {
            console.log("Email is required.");
            return res.status(400).json({ message: 'Email is required.' });
        }
        console.log("Check Request 3 ---")
        console.log("Logging in requestOTP with email:", email_);
        const otp = generateOTP();
        storeOTP(email_, otp, 120); // tồn tại 2 phút
        console.log("OTP generated and stored for email:", email_);
        await sendOTPEmail(email_, otp);

        res.status(200).json({ message: 'OTP đã được gửi.' });
    }

    async verifyOTPCode(req, res) {
        const {uid} = req.body;
        const {email} = req.body;
        const { otp } = req.body;
        const checkUp = await checkExist('users', 'uid', uid) || await checkExist('users', 'email', email);
        console.log("Logging in verifyOTPCode with uid:", uid);
        if (!checkUp) {
            return res.status(400).json({ message: 'Missing user.' });
        }
        if (!otp || otp.length < 6) {
            return res.status(400).json({ message: 'Invalid OTP code.' });
        }
        let emailres;
        if (!email){
            const resp = await pool.query('SELECT email FROM users WHERE uid = ?', [uid]);
            emailres = resp[0][0].email;
            if (resp[0].length === 0) {
                return res.status(400).json({ message: 'User not found.' });
            }
        }

        const email_ =  (email && email !== undefined && typeof email !== 'undefined')  ? email : emailres;
        const isValid = verifyOTP(email_, otp);

        if (!isValid) return res.status(400).json({ message: 'OTP không hợp lệ hoặc đã hết hạn.' });
        const updateres = await pool.query('UPDATE users SET status = ? WHERE uid = ?', ['active', uid]);
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