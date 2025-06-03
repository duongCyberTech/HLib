const sql = require('mysql2/promise');
require('dotenv').config();

const pool = sql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '123456',
    database: process.env.DATABASE || 'hcmutlib',
    port: process.env.PORT || 3306,
    waitForConnections: true,
    connectionLimit: 100
});

module.exports = pool;