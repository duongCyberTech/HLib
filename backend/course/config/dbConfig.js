const sql = require('mysql2/promise');
require('dotenv').config();
const redis = require("redis");

// Tạo client Redis
const client = redis.createClient({
  url: process.env.REDIS_URL 
});

client.connect()
  .then(() => console.log("✅ Redis connected"))
  .catch(err => console.error("❌ Redis connection error:", err));

const pool = sql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    waitForConnections: true,
    connectionLimit: 100
});

module.exports = {client, pool, sql};