const redis = require("redis");

// Tạo client Redis
const client = redis.createClient({
  url: "redis://localhost:6379"
});

client.connect()
  .then(() => console.log("✅ Redis connected"))
  .catch(err => console.error("❌ Redis connection error:", err));

module.exports={client}