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

describe('Book REST API', () => {
    let bookId;

    const testBook = {
        title: 'TestBook',
        genre: 'TestGenre',
        publicationDate: new Date().toISOString()
    };

    const updatedBook = {
        title: 'UpdatedTestBook',
        genre: 'UpdatedTestGenre',
        publicationDate: new Date().toISOString()
    };

    // 1. Create a book
    test('creates a new book', async () => {
        const response = await request.post('/book').send(testBook);
        bookId = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(testBook.title);
        expect(response.body.genre).toEqual(testBook.genre);
    });

    // 2. Retrieve all books
    test('gets all books', async () => {
        const response = await request.get('/book');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.some(book => book.title === testBook.title)).toBe(true);
    });

    // 3. Retrieve a specific book by its ID (and its associated author)
    test('gets a specific book by ID', async () => {
        const response = await request.get(`/book/${bookId}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(testBook.title);
        expect(response.body.genre).toEqual(testBook.genre);
        expect(response.body.author).toBeDefined(); // Ensure there's author information included
    });

    // 4. Update the book
    test('updates a book', async () => {
        const response = await request.put(`/book/${bookId}`).send(updatedBook);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(updatedBook.title);
        expect(response.body.genre).toEqual(updatedBook.genre);
    });

    // 5. Delete the book and confirm its deletion
    test('deletes a book', async () => {
        const response = await request.delete(`/book/${bookId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({});
        
        const getResponse = await request.get(`/book/${bookId}`);
        expect(getResponse.status).not.toEqual(200);
    });
});
