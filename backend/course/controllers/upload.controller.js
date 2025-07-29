const fs = require('fs');
const mega = require('megajs');
const { sendProgress } = require('../wsServer');

require('dotenv').config({ path: __dirname + '/.env' });

function uploadWithProgress(req, res) {
  const file = req.file;
  const uploadId = req.body.uploadId;

  if (!file || !uploadId) {
    return res.status(400).json({ message: 'Thiếu file hoặc uploadId' });
  }

  const filePath = file.path;
  const fileName = file.originalname;

  const stats = fs.statSync(filePath);
  const totalSize = stats.size;
  let uploaded = 0;

  const storage = mega({
    email: process.env.MEGA_EMAIL,
    password: process.env.MEGA_PASSWORD
  });

  storage.on('ready', () => {
    let hlibFolder = storage.root.children.find(c => c.name === 'hlib' && c.directory);

    const handleUpload = (targetFolder) => {
      const readStream = fs.createReadStream(filePath);
      const megaStream = targetFolder.upload({
        name: fileName,
        size: totalSize,
        allowUploadBuffering: true
      });

      readStream.on('data', (chunk) => {
        uploaded += chunk.length;
        const percent = Math.round((uploaded / totalSize) * 100);
        sendProgress(uploadId, percent);
      });

      readStream.pipe(megaStream);

      megaStream.on('complete', (uploadedFile) => {
        uploadedFile.link((err, url) => {
          fs.unlinkSync(filePath); // Xóa file tạm
          if (err) {
            return res.status(500).json({ message: 'Không lấy được link MEGA', error: err.message });
          }

          sendProgress(uploadId, 100);
          return res.status(200).json({
            name: uploadedFile.name,
            link: url
          });
        });
      });

      megaStream.on('error', (err) => {
        fs.unlinkSync(filePath);
        return res.status(500).json({ message: 'Lỗi upload MEGA', error: err.message });
      });
    };

    if (!hlibFolder) {
      storage.root.mkdir('hlib', (err, folder) => {
        if (err) {
          fs.unlinkSync(filePath);
          return res.status(500).json({ message: 'Không tạo được folder trên MEGA' });
        }
        handleUpload(folder);
      });
    } else {
      handleUpload(hlibFolder);
    }
  });

  storage.on('error', (err) => {
    fs.unlinkSync(filePath);
    return res.status(500).json({ message: 'Đăng nhập MEGA thất bại', error: err.message });
  });
}

module.exports = { uploadWithProgress };
