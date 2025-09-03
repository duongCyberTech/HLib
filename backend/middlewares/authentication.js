const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  if (req.body?.otp){
    return next();
  }
  const token = req?.headers.authorization?.split(' ')[1]; // Bearer <token>
  console.log(token)
  if (!token) return res.status(401).json({ message: 'No token provided' });
  console.log(process.env.JWT_SECRET)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Kiểm tra token hợp lệ
    console.log("Decode: ", decoded)
    req.body = req.body ? {...req.body, role: decoded.role, decoded: decoded} : {role: decoded.role, decoded: decoded}; // gắn thông tin user vào request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
