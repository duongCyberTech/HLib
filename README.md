# Hệ thống tài liệu học thuật và hỏi đáp dành cho sinh viên Bách Khoa (HCMUT Academic Forum)

Hệ thống cho phép sinh viên trao đổi tài liệu với nhau đồng thời cung cấp hệ thống khóa học để hỗ trợ sinh viên tự học cũng như forum cho sinh viên tạo chủ đề hỏi đáp.

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [API Reference](#api-reference)
- [Đóng Góp](#đóng-góp)
- [Giấy Phép](#giấy-phép)
- [Liên Hệ](#liên-hệ)

## 🚀 Giới Thiệu

Mô tả chi tiết hơn về dự án của bạn. Bao gồm:
- Mục đích của dự án: Tạo thư viện nhằm giúp sinh viên trao đổi tài liệu và các chủ đề học tập cũng như tạo các khóa giúp sinh viên tự học.
- Vấn đề mà dự án giải quyết: Giải quyết khó khăn trong việc tìm kiếm tài liệu học tập trong cộng đồng sinh viên.

## ✨ Tính Năng

- ✅ Tính năng 1: Thư viện tài liệu cho phép sinh viên tải lên và tải xuống tài liệu học tập.
- ✅ Tính năng 2: Thư viện khóa học cho phép sinh viên tạo khóa học chia sẻ kiến thức của bản thân đến cộng đồng.
- ✅ Tính năng 3: Forum cho phép sinh viên tạo chủ đề trao đổi học tập.
- 📋 Tính năng trong kế hoạch: AI Agent.

## 🛠️ Yêu Cầu Hệ Thống

- Node.js >= 16.0.0
- Python >= 3.8
- Database: MySQL
- OS: Android đối với app

## 📦 Cài Đặt

### Cài đặt nhanh

```bash
# Clone repository
git clone https://github.com/duongCyberTech/HLib.git

# Di chuyển vào thư mục dự án
cd HLib

# Cài đặt dependencies
# 1. Frontend
cd frontend
npm install
npm run dev

# 2. Backend
cd backend
npm install
npm run start:all
```

## 🧪 Testing

```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests trong watch mode
npm run test:watch
```

## 🐛 Debug

Để bật chế độ debug:

```bash
DEBUG=project-name:* npm start
```

## 📁 Cấu Trúc Thư Mục

```
HLib/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
├── tests/
├── docs/
├── public/
├── package.json
├── README.md
└── .env.example
```

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết chi tiết.

### Quy trình đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 Changelog

Xem [CHANGELOG.md](CHANGELOG.md) để biết lịch sử thay đổi.

## 🔒 Bảo Mật

Nếu bạn phát hiện lỗ hổng bảo mật, vui lòng gửi email đến security@example.com thay vì tạo issue công khai.

## 📊 Status

![Build Status](https://img.shields.io/github/workflow/status/username/project-name/CI)
![Coverage](https://img.shields.io/codecov/c/github/username/project-name)
![Version](https://img.shields.io/npm/v/project-name)
![License](https://img.shields.io/github/license/username/project-name)

## 📄 Giấy Phép

Dự án này được cấp phép theo [MIT License](LICENSE) - xem file LICENSE để biết chi tiết.

## 👥 Liên Hệ

- **Tác giả:** Nhóm tác giả đến từ Trường Đại học Bách khoa - Đại học Quốc gia Thành phố Hồ Chí Minh
- **Email:** hcmutlib@gmail.com / maidangduong92tn@gmail.com
- **Website:** https://yourwebsite.com
- **GitHub:** [@](https://github.com/duongCyberTech)

## 🔗 Liên Kết Hữu Ích

- [Documentation](https://docs.example.com)
- [Demo](https://demo.example.com)
- [Issues](https://github.com/username/project-name/issues)
- [Discussions](https://github.com/username/project-name/discussions)

---

**⭐ Nếu dự án này hữu ích, hãy cho chúng tôi một star trên GitHub!**
