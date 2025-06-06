const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({ path: '../config/.env' });

function parseUnicode(str) {
  return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // xóa dấu
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
}

function randomString(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

class AuthService {
    async registerUser(userData) {
        const {fname, lname, mname, email, avata , password, role, salary } = userData;
        if (!fname || !lname || !email || !password|| !mname ) {
            throw new Error('Missing required fields');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const username = `${parseUnicode(lname)}${fname[0]}${mname[0]}`.trim() + randomString();
        const userId = uuidv4() + '-' + randomString(4);
        const query = `INSERT INTO users (uid, fname, mname, lname, username, password, email, avata, role, salary) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        await pool.query(query, [userId, fname, mname, lname, username, hashedPassword, email, avata || null, role || 'user', salary || 0]);
        return { uid: userId, username };
    }

    async loginUser(userData) {
        const { username, password, email } = userData;
        console.log('Logging in user with data:', { username, email, password });
        const query = 'SELECT uid, username, password, status FROM users WHERE username = ? OR email = ?';
        const [rows] = await pool.query(query, [username || "-", email || "-"]);

        if (rows.length === 0) {
            throw new Error('User not found');
        }

        const user = rows[0];
        if (user.status[0] === 0) {
            throw new Error('User is not active. Please verify your account or contact the administrator.');
        }
        console.log('Found user:', user);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        console.log('User logged in:', user.username);
        const token = jwt.sign({ uid: user.uid, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
    
    async changePassword(userData) {
        const { uid, oldPassword, newPassword } = userData;
        if (!uid || !oldPassword || !newPassword) {
            throw new Error('Missing required fields');
        }
        const query = 'SELECT password FROM users WHERE uid = ?';
        const [rows] = await pool.query(query, [uid]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }

        const user = rows[0];
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new Error('Old password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        const updateQuery = 'UPDATE users SET password = ? WHERE uid = ?';

        const [result] = await pool.query(updateQuery, [hashedNewPassword, uid]);
        if (result.affectedRows === 0) {
            throw new Error('Failed to update password');
        }
        return { message: 'Password changed successfully' };
    }

    async sendPasswordResetEmail(email) {
        const subpassword = randomString(10);
        const hashedPassword = await bcrypt.hash(subpassword, 12);
        const query = 'UPDATE users SET password = ? WHERE email = ?';
        const [result] = await pool.query(query, [hashedPassword, email]);
        if (result.affectedRows === 0) {
            throw new Error('Email not found');
        }
        return subpassword;
    }
}

module.exports = new AuthService();