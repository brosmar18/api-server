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

describe('Author REST API', () => {
    let authorId;

    const testAuthor = {
        name: 'TestAuthor',
        bio: 'This is a test bio for TestAuthor'
    };

    const updatedAuthor = {
        name: 'UpdatedTestAuthor',
        bio: 'This bio has been updated for the author'
    };

    // 1. Create an author
    test('creates a new author', async () => {
        const response = await request.post('/author').send(testAuthor);
        authorId = response.body.id; // capture the ID for use in subsequent tests
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testAuthor.name);
        expect(response.body.bio).toEqual(testAuthor.bio);
    });

    // 2. Retrieve all authors (ensures the creation above is reflected)
    test('gets all authors', async () => {
        const response = await request.get('/author');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(author => author.name === testAuthor.name)).toBe(true);
    });

    // 3. Retrieve a specific author by its ID
    test('gets a specific author by ID', async () => {
        const response = await request.get(`/author/${authorId}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(testAuthor.name);
        expect(response.body.bio).toEqual(testAuthor.bio);
    });

    // 4. Update details of the created author
    test('updates an author', async () => {
        const response = await request.put(`/author/${authorId}`).send(updatedAuthor);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(updatedAuthor.name);
        expect(response.body.bio).toEqual(updatedAuthor.bio);
    });

    // 5. Retrieve all books of the author (additional operation specific to this API)
    test('gets all books written by a specific author', async () => {
        const response = await request.get(`/author/${authorId}/books`);
        expect(response.status).toEqual(200);
    });

    // 6. Delete the author and confirm its deletion
    test('deletes an author', async () => {
        const response = await request.delete(`/author/${authorId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({});

        // Confirm the deletion by trying to fetch the deleted author
        const getResponse = await request.get(`/author/${authorId}`);
        expect(getResponse.status).not.toEqual(200);
    });
});
