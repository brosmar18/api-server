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


describe('clothes REST API', () => {
    let clothesId;

    test('creates a clothes item', async () => {
        let response = await request.post('/clothes').send({
            name: 'TestClothes',
            color: 'TestColor',
            size: 'small'
        });

        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('TestClothes');
        expect(response.body.color).toEqual('TestColor');
        expect(response.body.size).toEqual('small');
        expect(response.body.id).toBeTruthy();
    });

    test('gets clothes', async () => {
        let response = await request.get('/clothes');

        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('TestClothes');
        expect(response.body[0].color).toEqual('TestColor');
        expect(response.body[0].size).toEqual('small');
        expect(response.body[0].id).toBeTruthy();
    });

    test('gets a clothes item by id', async () => {
        let response = await request.post('/clothes').send({
            name: 'TestClothesForGetItem',
            color: 'TestForGetItemColor',
            size: 'medium'
        });

        clothesId = response.body.id;

        response = await request.get(`/clothes/${clothesId}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('TestClothesForGetItem');
        expect(response.body.color).toEqual('TestForGetItemColor');
        expect(response.body.size).toEqual('medium');
    });

    test('updates a clothes item', async () => {
        let response = await request.put(`/clothes/${clothesId}`).send({
            name: 'UpdatedTestClothes',
            color: 'UpdatedTestColor',
            size: 'large'
        });

        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('UpdatedTestClothes');
        expect(response.body.color).toEqual('UpdatedTestColor');
        expect(response.body.size).toEqual('large');
    });

    test('deletes a clothes item', async () => {
        let response = await request.delete(`/clothes/${clothesId}`);

        expect(response.status).toEqual(204);
        expect(response.body).toMatchObject({});


        // try to get a deleted clothes item, expecting a 404 response
        response = await request.get(`/clothes/${clothesId}`);
        expect(response.status).toEqual(404);
    });
});