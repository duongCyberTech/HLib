const sql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });
const redis = require("redis");

// Tạo client Redis
const client = redis.createClient({
  url: process.env.REDIS_URL 
});

client.connect()
  .then(() => console.log("✅ Redis connected"))
  .catch(err => console.error("❌ Redis connection error:", err));

const pool = sql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '123456',
    database: process.env.DATABASE || 'hcmutlib',
    port: process.env.PORT || 3306,
    waitForConnections: true,
    connectionLimit: 100
});

module.exports = {client, pool};