
const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

const testStudentDetails = {
    address: '123 Main St',
    phoneNumber: '555-1234',
    emergencyContact: 'John Doe'
};

let studentDetailsId;

beforeAll(async () => {
    await sequelizeDatabase.sync();
    // Create a student detail record before running the tests
    const response = await request.post('/studentDetails').send(testStudentDetails);
    studentDetailsId = response.body.id;
});

afterAll(async () => {
    await sequelizeDatabase.drop();
});


describe('StudentDetails REST API', () => {
    // 1. Create a new student detail
    test('creates a new student detail', async () => {
        const response = await request.post('/studentDetails').send(testStudentDetails);
        studentDetailsId = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.address).toEqual(testStudentDetails.address);
    });

    // 2. Get a specific student detail by ID
    test('gets a specific student detail by ID', async () => {
        const response = await request.get(`/studentDetails/${studentDetailsId}`);
        expect(response.status).toEqual(200);
        expect(response.body.address).toEqual(testStudentDetails.address);
    });

    // 3. Update a student detail
    test('updates a student detail', async () => {
        const updatedDetails = {
            address: '456 Elm St',
            phoneNumber: '555-5678',
            emergencyContact: 'Jane Smith'
        };

        const response = await request.put(`/studentDetails/${studentDetailsId}`).send(updatedDetails);
        expect(response.status).toEqual(200);
        expect(response.body.address).toEqual(updatedDetails.address);
    });

    // 4. Get all student details
    test('gets all student details', async () => {
        const response = await request.get('/studentDetails');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(detail => detail.address === testStudentDetails.address)).toBe(true);
    });

    // 5. Delete a student detail
    test('delete a student detail', async () => {
        const response = await request.delete(`/studentDetails/${studentDetailsId}`);
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Record deleted successfully');
    });
});
