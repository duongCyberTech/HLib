const express = require('express');
const otpStore = new Map(); // { email: { otp, expiresAt } }

function generateOTP(length = 6) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
}

function storeOTP(email, otp, ttl = 120) {
  const expiresAt = Date.now() + ttl * 1000;
  otpStore.set(email, { otp, expiresAt });

  setTimeout(() => otpStore.delete(email), ttl * 1000);
}

function verifyOTP(email, inputOtp) {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) return false;
  return inputOtp === record.otp;
}

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP
};
