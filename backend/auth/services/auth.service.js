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
        await pool.query(query, [userId, fname, mname, lname, username, hashedPassword, email, avata || null, role || 'user', salary || 0, 1]);
        return { id: userId, username };
    }

    async loginUser(userData) {
        const { username, password, email } = userData;

        const query = 'SELECT uid, username FROM users WHERE username = ? OR email = ?';
        const [rows] = await pool.query(query, [username || "-", email || "-"]);

        if (rows.length === 0) {
            throw new Error('User not found');
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ uid: user.uid, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
}

module.exports = new AuthService();