'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
    await sequelizeDatabase.sync();
});

afterAll(async () => {
    await sequelizeDatabase.drop();
});

describe('food REST API', () => {
    test('creates  a food item', async () => {
        let response = await request.post('/food').send({
            name: 'TestFood',
            price: 5.99,
            calories: 350
        });

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('TestFood');
        expect(response.body.price).toEqual(5.99);
        expect(response.body.calories).toEqual(350);
        expect(response.body.id).toBeTruthy();
    });
});