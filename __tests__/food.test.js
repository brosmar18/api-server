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

    let foodId;

    test('creates  a food item', async () => {
        let response = await request.post('/food').send({
            name: 'TestFood',
            price: 5.99,
            calories: 350
        });

        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('TestFood');
        expect(response.body.price).toEqual(5.99);
        expect(response.body.calories).toEqual(350);
        expect(response.body.id).toBeTruthy();
    });

    test('gets foods', async () => {
        let response = await request.get('/food');

        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('TestFood');
        expect(response.body[0].price).toEqual(5.99);
        expect(response.body[0].calories).toEqual(350);
        expect(response.body[0].id).toBeTruthy();
    });

    test('gets a food item by id', async () => {
        let response = await request.post('/food').send({
            name: 'TestFoodForGetItem',
            price: 8.99,
            calories: 250
        });

        foodId = response.body.id;

        response = await request.get(`/food/${foodId}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('TestFoodForGetItem');
        expect(response.body.price).toEqual(8.99);
        expect(response.body.calories).toEqual(250);
    });
    test('updates a food item', async () => {
        let response = await request.put(`/food/${foodId}`).send({
            name: 'UpdatedTestFood',
            price: 7.99,
            calories: 675
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('UpdatedTestFood');
        expect(response.body.price).toEqual(7.99);
        expect(response.body.calories).toEqual(675);
    });

    test('deletes a food item', async () => {
        let response = await request.delete(`/food/${foodId}`);

        expect(response.status).toEqual(204);
        expect(response.body).toMatchObject({});

        // try to get a deleted food item, expecting a 404 response
        response = await request.get(`/food/${foodId}`);
        expect(response.status).toEqual(404);
    });
});