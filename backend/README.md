# HCMUT Academic Forum - Backend

## 📋 Tổng quan

Backend của HCMUT Academic Forum được xây dựng với kiến trúc Micro-services và được kiểm soát thông qua API Gateway..

## 🛠️ Tech Stack

# Máy chủ RESTful API sử dụng Node.js

**Phiên bản: 22.16.0**

Đây là một máy chủ RESTful API được xây dựng bằng **Express.js**, tích hợp với tài liệu **Swagger**, hỗ trợ **Redis caching** và **Cơ sở dữ liệu MySQL**. Dự án sử dụng một số thư viện phổ biến của Node.js để phát triển nhanh chóng và có cấu trúc chuẩn hóa.

---
## 📦 Các thư viện sử dụng (Dependencies)

```json
"dependencies": {
  "body-parser": "^2.2.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "fs": "^0.0.1-security",
  "http-proxy-middleware": "^3.0.5",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "megajs": "^1.3.7",
  "multer": "^2.0.2",
  "mysql2": "^3.14.2",
  "path": "^0.12.7",
  "redis": "^5.6.1",
  "swagger-combine": "^1.4.0",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1",
  "uuid": "^11.1.0",
  "ws": "^8.18.3"
}
```
---

## 🏗️ Cấu trúc dự án

```
└── backend
    ├── .gitignore
    ├── auth
        ├── Dockerfile
        ├── config
        │   └── dbConfig.js
        ├── controllers
        │   └── auth.controller.js
        ├── package-lock.json
        ├── package.json
        ├── routes
        │   └── auth.route.js
        ├── server.js
        ├── services
        │   ├── auth.service.js
        │   ├── mail.service.js
        │   └── otp.service.js
        └── utils
        │   └── checkExist.js
    ├── course
        ├── config
        │   └── dbConfig.js
        ├── controllers
        │   ├── course.controller.js
        │   └── upload.controller.js
        ├── package-lock.json
        ├── package.json
        ├── routes
        │   └── course.route.js
        ├── server.js
        ├── services
        │   └── course.service.js
        └── wsServer.js
    ├── gateway
        ├── index.js
        ├── package-lock.json
        ├── package.json
        └── swagger
        │   ├── auth.yaml
        │   ├── combined.yaml
        │   ├── course.yml
        │   └── index.yaml
    ├── middlewares
        ├── authentication.js
        ├── authorization.js
        ├── package-lock.json
        ├── package.json
        └── validation.js
    ├── migrate
        └── hlib.sql
    ├── package-lock.json
    ├── package.json

```

## 🔄 Luồng hoạt động của ứng dụng
### 1. Cài đặt doppler để truy cập biến môi trường
```bash
# Cài đặt, giải nén và thêm doppler.exe vào biến môi trường của máy: https://github.com/DopplerHQ/cli/releases/tag/3.75.1

# Kiểm tra xem đã cài đặt doppler thành công hay chưa
doppler --version

# Kết nối doppler
doppler setup --token=<YOUR_TOKEN>

# Kiểm tra kết nối
doppler secrets
```
### 2. Combine Swagger API Document
```bash
npm run apis
```

### 3. Chạy backend
```bash
# Di chuyển vào thư mục dự án
cd backend

# Cài đặt dependencies
npm run install:all

# Chạy server
npm run start:all
```

## 🤖 API Docs
API Document được tạo dựa trên **Swagger**, truy cập **Swagger UI** thông qua đường dẫn http://localhost:3000/api-docs
Để test api từng service, thay đổi servers end-point qua service cần test với
- **API Gateway:** http://localhost:3000
- **Authentication:** http://localhost:3001
- **Course:** http://localhost:3002

