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
});