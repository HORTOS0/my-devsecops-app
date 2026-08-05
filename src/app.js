const express = require('express');
const app = express(); // crée l'application Express
const PORT = process.env.PORT || 3000; // port depuis variable d'env
app.get('/', (req, res) => { // route principale
res.json({ status: 'ok', version: '1.0.0' });
});
app.get('/health', (req, res) => { // ECS appelle cette route pour vérifier si le conteneur est vivant
res.status(200).json({ status: 'healthy' });
});
app.listen(PORT, () => console.log(`Port ${PORT}`));
module.exports = app; // exporté pour les tests Jest
