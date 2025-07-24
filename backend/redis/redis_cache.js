require('dotenv').config();
const redis = require("redis");

// Tạo client Redis
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.connect()
  .then(() => console.log("✅ Redis connected"))
  .catch(err => console.error("❌ Redis connection error:", err));

module.exports={client}