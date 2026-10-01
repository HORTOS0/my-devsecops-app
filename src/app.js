const express = require('express');
const app = express(); // crée l'instance Express
const PORT = process.env.PORT || 3000; // PORT depuis variable d'environnement ou 3000 par défaut
app.use(express.json()); // middleware : parse le JSON dans les requêtes entrantes
app.get('/', (req, res) => { // route principale — répond aux GET /
  res.json({ status: 'ok', version: process.env.APP_VERSION || '1.0.0' });
});
app.get('/health', (req, res) => { // ECS appelle cette route toutes les 30s pour vérifier si le conteneur est vivant
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => console.log(`Serveur démarré sur port ${PORT}`));
module.exports = app; // exporté pour que Jest puisse importer l'app dans les tests
