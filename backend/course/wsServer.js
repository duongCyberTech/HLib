const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3003 });
const clients = new Map(); // Map uploadId => ws

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const { uploadId } = JSON.parse(message);
      if (uploadId) {
        clients.set(uploadId, ws);
      }
    } catch (err) {
      console.error('Invalid message:', err.message);
    }
  });

  ws.on('close', () => {
    for (const [id, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(id);
        break;
      }
    }
  });
});

function sendProgress(uploadId, percent) {
  const ws = clients.get(uploadId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ progress: percent }));
  }
}

module.exports = { sendProgress };
