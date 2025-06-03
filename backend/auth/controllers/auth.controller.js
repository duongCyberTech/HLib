const AuthService = require('../services/auth.service');

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
            const result = await this.authService.loginUser(userData);
            res.status(200).json({ message: 'Login successful', token: result.token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();