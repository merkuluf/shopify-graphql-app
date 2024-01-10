const request = require('supertest');
const app = require('../index')

describe('Test [GET] products route', () => {
    test('GET /api/products', async () => {
        const response = await request(app).get('/api/products');

        // сheck if the response body is an array
        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);

        expect(response.statusCode).toBe(200);

    });


});
