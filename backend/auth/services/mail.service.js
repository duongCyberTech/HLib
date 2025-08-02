const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/.env' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS_
  }
});

async function sendOTPEmail(to, otp) {
  const html = `
    <h3>Mã OTP của bạn là: <span style="color:blue;">${otp}</span></h3>
    <p>Mã này sẽ hết hạn sau 2 phút.</p>
  `;

  await transporter.sendMail({
    from: `"HCMUTLib" <themrz1404@gmail.com>`,
    to: "hcmutlib@gmail.com",
    subject: 'Mật khẩu mới của bạn',
    html
  });

  console.log('✅ Email sent to', to);
}

async function sendPasswordEmail(to, subpassword) {
  const html = `
    <h3>Mật khẩu mới của bạn là: <span style="color:blue;">${subpassword}</span></h3>
    <p>Vui lòng đổi mật khẩu sau khi đăng nhập.</p>
  `;

  await transporter.sendMail({
    from: `"HCMUTLib" <themrz1404@gmail.com>`,
    to: "themrz1404@gmail.com",
    subject: 'Mã OTP xác thực',
    html
  });

  console.log('✅ Email sent to', to);
}

module.exports = { sendOTPEmail, sendPasswordEmail };
