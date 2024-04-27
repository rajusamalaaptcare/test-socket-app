const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const messages = [];

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
      const decodedMessage = message.toString('utf-8');

    console.log('Received message:', message);
    console.log('Decoded message:', decodedMessage);
    messages.push(decodedMessage);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(messages));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
