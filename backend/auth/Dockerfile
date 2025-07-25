# Sử dụng image chính thức của Node.js
FROM node:20-alpine

# Tạo thư mục app và đặt nó làm thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà app sẽ chạy (thường là 3000)
EXPOSE 3001

# Lệnh để chạy app
CMD ["node", "index.js"]
