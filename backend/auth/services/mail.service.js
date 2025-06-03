const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "themrz1404@gmail.com",
    pass: "kwwdumzkfkxxdzng" // app password của Gmail
  }
});

async function sendOTPEmail(to, otp) {
  const html = `
    <h3>Mã OTP của bạn là: <span style="color:blue;">${otp}</span></h3>
    <p>Mã này sẽ hết hạn sau 2 phút.</p>
  `;

  await transporter.sendMail({
    from: `"HCMUTLib" <themrz1404@gmail.com>`,
    to: "themrz1404@gmail.com",
    subject: 'Mã OTP xác thực',
    html
  });

  console.log('✅ Email sent to', to);
}

module.exports = { sendOTPEmail };
