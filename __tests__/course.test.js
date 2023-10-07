const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

const testCourse = {
    courseName: 'Intro to Testing',
    credits: 3,
    instructor: 'Dr. Tester',
    studentId: 1
};

const updatedCourse = {
    courseName: 'Advanced Testing',
    credits: 4,
    instructor: 'Prof. Tester',
    studentId: 1
};


beforeAll(async () => {
    await sequelizeDatabase.sync();

    // Create a student before running the tests
    const studentData = {
        firstName: 'Test',
        lastName: 'Student',
        age: 20,
        major: 'Computer Science'
    };
    
    const studentResponse = await request.post('/student').send(studentData);
    testCourse.studentId = studentResponse.body.id;
});


afterAll(async () => {
    // Delete the student after all tests
    await request.delete(`/student/${testCourse.studentId}`);
    await sequelizeDatabase.drop();
});



describe('Course REST API', () => {
    let courseId;

    // 1. Create a course
    test('creates a new course', async () => {
        const response = await request.post('/course').send(testCourse);
        courseId = response.body.id;
        expect(response.status).toEqual(201);
        expect(response.body.courseName).toEqual(testCourse.courseName);
        expect(response.body.credits).toEqual(testCourse.credits);
    });

    // 2. Retrieve all courses
    test('gets all courses', async () => {
        const response = await request.get('/course');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(course => course.courseName === testCourse.courseName)).toBe(true);
    });

    // 3. Retrieve a specific course by its ID
    test('gets a specific course by ID', async () => {
        const response = await request.get(`/course/${courseId}`);
        expect(response.status).toEqual(200);
        expect(response.body.courseName).toEqual(testCourse.courseName);
        expect(response.body.credits).toEqual(testCourse.credits);
    });

    // 4. Retrieve students enrolled in a specific course
    test('gets all students in a course', async () => {
        const response = await request.get(`/course/${courseId}/students`);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // 5. Update the course
    test('updates a course', async () => {
        const response = await request.put(`/course/${courseId}`).send(updatedCourse);
        expect(response.status).toEqual(200);
        expect(response.body.courseName).toEqual(updatedCourse.courseName);
        expect(response.body.credits).toEqual(updatedCourse.credits);
    });

    // 6. Delete the course and confirm its deletion
    test('deletes a course', async () => {
        const response = await request.delete(`/course/${courseId}`);
        expect(response.status).toEqual(200);
        
        const getResponse = await request.get(`/course/${courseId}`);
        expect(getResponse.status).not.toEqual(200);
    });
});
