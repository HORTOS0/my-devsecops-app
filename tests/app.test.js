const request = require('supertest'); // simule des requêtes HTTP
const app = require('../src/app'); // importe l'app
describe('GET /', () => {
it('retourne status ok', async () => {
const res = await request(app).get('/');
expect(res.statusCode).toBe(200); // vérifie le code HTTP
expect(res.body.status).toBe('ok'); // vérifie le contenu
});
});
describe('GET /health', () => {
it('retourne healthy', async () => {
const res = await request(app).get('/health');
expect(res.statusCode).toBe(200);
});
});
