'use strict';

const express = require('express');
const { authorCollection, bookCollection } = require('../models');

const router = express.Router();

// CRUD routes for Author
router.get('/author', async (req, res, next) => {
    const authors = await authorCollection.read();
    res.status(200).send(authors);
});

router.get('/author/:id', async (req, res, next) => {
    const author = await authorCollection.read(req.params.id);
    res.status(200).send(author);
});

router.post('/author', async (req, res, next) => {
    const newAuthor = await authorCollection.create(req.body);
    res.status(200).send(newAuthor);
});

router.put('/author/:id', async (req, res, next) => {
    const updatedAuthor = await authorCollection.update(req.params.id, req.body);
    res.status(200).send(updatedAuthor);
});

router.delete('/author/:id', async (req, res, next) => {
    const result = await authorCollection.delete(req.params.id);
    res.status(200).send(result);
});

// Route to get books by an author
router.get('/author/:id/books', async (req, res, next) => {
    const author = await authorCollection.read(req.params.id);
    if (author) {
        const books = await author.getBooks();
        res.status(200).send(books);
    } else {
        res.status(404).send({ message: 'Author not found' });
    }
});

module.exports = router;
