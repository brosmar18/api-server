const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

const testStudent = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 24,
    major: 'Physics'
};

const updatedStudent = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    major: 'Mathematics'
};

const studentDetails = {
    address: '123 Main St',
    phoneNumber: '555-1234',
    emergencyContact: 'John Doe'
};

const testCourse = {
    courseName: 'Sample Course',
    credits: 3,
    instructor: 'Dr. Sample'
};

let studentId; 
let courseId;

beforeAll(async () => {
    await sequelizeDatabase.sync();

    const courseResponse = await request.post('/course').send(testCourse);
    courseId = courseResponse.body.id;
});

afterAll(async () => {
    await request.delete(`/course/${courseId}`);
    await sequelizeDatabase.drop();
});

describe('Student REST API', () => {
    let studentId; 

    // 1. Create a new student
    test('creates a new student', async () => {
        const response = await request.post('/student').send(testStudent);
        studentId = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(testStudent.firstName);
    });

    // 2. Get a specific student by ID
    test('gets a specific student by ID', async () => {
        const response = await request.get(`/student/${studentId}`);
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(testStudent.firstName);
    });

    // 3. Update the student details
    test('updates student details', async () => {
        const response = await request.post(`/student/${studentId}/details`).send(studentDetails);
        expect(response.status).toEqual(200);
        expect(response.body.address).toEqual(studentDetails.address);
    });

    // 4. Get all students
    test('gets all students', async () => {
        const response = await request.get('/student');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(student => student.firstName === testStudent.firstName)).toBe(true);
    });

    // 5. Update a student's data
    test('updates a student', async () => {
        const response = await request.put(`/student/${studentId}`).send(updatedStudent);
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(updatedStudent.firstName);
    });

    // 6. Enroll a student in the created course
    test('enroll student in a course', async () => {
        const response = await request.post(`/student/${studentId}/enroll/${courseId}`);
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Student enrolled in course successfully');
    });


    // 7. Get courses the student is enrolled in
    test('get student courses', async () => {
        const response = await request.get(`/student/${studentId}/courses`);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // 8. Get a student's details
    test('get student details', async () => {
        const response = await request.get(`/student/${studentId}/details`);
        expect(response.status).toEqual(200);
        expect(response.body.address).toEqual(studentDetails.address);
    });

    // 9. Delete a student
    test('delete a student', async () => {
        const response = await request.delete(`/student/${studentId}`);
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('Record deleted successfully');
    });
});
