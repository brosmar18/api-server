'use strict';

const express = require('express');
const { bookCollection, authorCollection } = require('../models');

const router = express.Router();

// CRUD routes for Book
router.get('/book', async (req, res, next) => {
    const books = await bookCollection.read();
    res.status(200).send(books);
});

router.get('/book/:id', async (req, res, next) => {
    try {
        const book = await bookCollection.read(req.params.id, {
            include: [{
                model: authorCollection.model,
                as: 'author'
            }]
        });
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send({ message: 'Book not found' });
        }
    } catch (e) {
        next(e);
    }
});

router.post('/book', async (req, res, next) => {
    const newBook = await bookCollection.create(req.body);
    res.status(200).send(newBook);
});

router.put('/book/:id', async (req, res, next) => {
    const updatedBook = await bookCollection.update(req.params.id, req.body);
    res.status(200).send(updatedBook);
});

router.delete('/book/:id', async (req, res, next) => {
    const result = await bookCollection.delete(req.params.id);
    res.status(200).send(result);
});

module.exports = router;
