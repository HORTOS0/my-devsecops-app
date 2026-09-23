const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Charger les certificats SSL (Let’s Encrypt par exemple)
const options = {
  key: fs.readFileSync('/home/ali/certs/server.key'),
  cert: fs.readFileSync('/home/ali/certs/server.crt')
};

// Serveur HTTPS
https.createServer(options, app).listen(443, () => {
  console.log('Serveur HTTPS démarré sur le port 443');
});

// Redirection HTTP → HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

// Garder la compatibilité avec Jest et autres outils
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Port ${PORT}`));

module.exports = app;
