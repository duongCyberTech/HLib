const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const authenticate = (req, res, next) => {
  const token = req?.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Kiểm tra token hợp lệ
    req.body = decoded; // gắn thông tin user vào request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
