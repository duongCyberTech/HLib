const {client, pool, storage} = require('../config/dbConfig');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const pdf = require("pdf-parse");
const AdmZip = require("adm-zip");
const libre = require("libreoffice-convert");

class DocsService {
    async uploadDocs(fileDes, file) {
        try {
            const did = uuidv4()
            const filePath = file.path;
            const fileName = file.originalname;
            const fileExt = path.extname(fileName);   

            const stats = fs.statSync(filePath);
            const fileSize = stats.size;
            let uploaded = 0;

            storage.on('ready', () => {
                let hlibFolder = storage.root.children.find(c => c.name === 'hlib' && c.directory);
                if (!hlibFolder) {
                    hlibFolder = storage.root.createFolder('hlib');
                }

                const readStream = fs.createReadStream(filePath);
                const megaStream = hlibFolder.upload({
                    name: fileName,
                    size: fileSize,
                    allowUploadBuffering:true
                })

                readStream.on('data', (chunk) => {
                    uploaded += chunk.length;
                });

                readStream.pipe(megaStream);

                megaStream.on('complete', (uploadedFile) => {
                    console.log("File uploaded successfully:", uploadedFile);
                });

                megaStream.on('error', (error) => {
                    console.error("Error uploading file:", error);
                });

                megaStream.on('complete',async (uploadedFile) => {
                    uploadedFile.link(async (err, url) => {
                        if (err) {
                            console.error("Error getting file link:", err);
                            readStream.unpipe(megaStream);
                            throw new Error("Failed to get file link");
                        } else {
                            console.log("File link:", url);
                            const date = new Date();
                            await pool.query(`
                                INSERT INTO documents(
                                    did, title, status, upload_date, description, 
                                    file_path, file_size, file_type, pages, nb_of_favorites, 
                                    fee, cid, uid, tid
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `, [did, fileName, 'uploaded', date, fileDes, filePath, fileSize, file.mimetype, 1, 0, 0, null, null, null])
                            readStream.unpipe(megaStream);
                            return {did, url, fileName};
                        }
                    });
                });
                readStream.on('end', () => {
                    megaStream.end();
                });
            })
            const result = await pool.query("INSERT INTO documents (description, path) VALUES (?, ?)", [fileDes, filePath]);
            return { success: true, data: result[0] };
        } catch (error) {
            console.error("Error uploading document:", error);
            return { success: false, error: "Failed to upload document" };
        }
    }
}
