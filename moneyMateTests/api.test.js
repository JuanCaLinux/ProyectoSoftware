
const request = require('supertest');
const app = require('../Back/server.js'); // Ruta al archivo principal del servidor

describe('GET /api/login', () => {
    it('should return a 200 status and a success message', async () => {
        const response = await request(app).get('/api/login');
        expect(response.statusCode).toBe(200);
        // Ajusta según la respuesta esperada
        expect(response.body).toHaveProperty('message');
    });
});

describe('POST /api/register', () => {
    it('should create a user and return a 201 status', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ username: 'testuser', password: 'testpass' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});

describe('GET /api/categoria', () => {
    it('should return a 200 status and categories', async () => {
        const response = await request(app).get('/api/categoria');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('categories');
    });
});

describe('POST /api/registro', () => {
    it('should register an expense and return a 201 status', async () => {
        const response = await request(app)
            .post('/api/registro')
            .send({ amount: 100, category: 'Food' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});
