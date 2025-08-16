import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const uploadId = Date.now().toString(); // Tạo id riêng cho mỗi lần upload

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3003');

    socket.onopen = () => {
      socket.send(JSON.stringify({ uploadId }));
    };

    socket.onmessage = (msg) => {
      const { progress } = JSON.parse(msg.data);
      console.log("--- ", progress)
      setProgress(progress);
    };

    return () => socket.close();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadId", uploadId);

    const res = await axios.post('http://localhost:3002/api/course/upload-file', formData);
    console.log(res)
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" onChange={() => setProgress(0)}/>
      <button type="submit">Upload</button>
      <div>
        Progress: {progress}%
        <progress value={progress} max="100" />
      </div>
    </form>
  );
};

export default FileUpload;
