const fs = require('fs');
const mega = require('megajs');
const { sendProgress } = require('../wsServer');

require('dotenv').config();

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
        console.log('✅ Upload MEGA xong:', uploadedFile.name);

        uploadedFile.link((err, url) => {
          console.log('📡 Đã gọi link() callback');

          fs.unlinkSync(filePath);

          if (err) {
            console.error('❌ Không lấy được link:', err);
            return res.status(500).json({ message: 'Không lấy được link MEGA', error: err.message });
          }

          sendProgress(uploadId, 100);
          console.log('✅ Gửi response về client: ', url);
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

async function downloadFromMega(req, res) {
  const { link, downloadId } = req.body;

  if (!link || !downloadId) {
    return res.status(400).json({ message: 'Thiếu link hoặc downloadId' });
  }

  const file = mega.File.fromURL(link);

  file.loadAttributes((err, fileData) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi lấy thông tin file MEGA' });
    }

    const totalSize = fileData.size;
    let downloaded = 0;

    const fileName = fileData.name;
    const tempPath = path.join(__dirname, '..', 'downloads', fileName);
    const writeStream = fs.createWriteStream(tempPath);

    const dlStream = file.download();

    dlStream.on('data', (chunk) => {
      downloaded += chunk.length;
      const percent = Math.floor((downloaded / totalSize) * 100);
      sendProgress(downloadId, { percent });
    });

    dlStream.on('end', () => {
      sendProgress(downloadId, {
        percent: 100,
        status: 'done',
        name: fileName
      });

      // Gửi file về client nếu cần
      return res.download(tempPath, fileName, () => {
        fs.unlinkSync(tempPath); // Xóa file sau khi gửi
      });
    });

    dlStream.on('error', (err) => {
      sendProgress(downloadId, {
        error: 'Lỗi khi tải file MEGA',
        detail: err.message
      });
      return res.status(500).json({ message: 'Lỗi tải file MEGA' });
    });

    dlStream.pipe(writeStream);
  });
}

module.exports = { uploadWithProgress, downloadFromMega };
