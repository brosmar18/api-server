'use strict';

const express = require('express');
const { clothesCollection } = require('../models');

const router = express.Router();

// Route to get all clothes items
router.get('/clothes', async (req, res, next) => {
    const clothes = await clothesCollection.read();
    res.status(200).send(clothes);
});

// Route to get a specific clothes item by ID
router.get('/clothes/:id', async (req, res, next) => {
    const singleClothesItem = await clothesCollection.read(req.params.id);
    res.status(200).send(singleClothesItem);
});

// Route to create a new clothes item
router.post('/clothes', async (req, res, next) => {
    try {
        console.log('This is the body', req.body);
        const newClothes = await clothesCollection.create(req.body);
        res.status(200).send(newClothes);
    } catch (e) {
        next(e);
    }
});

// Route to update an existing clothes item by ID
router.put('/clothes/:id', async (req, res, next) => {
    try {
        const updatedClothes = await clothesCollection.update(req.params.id, req.body);

        if (updatedClothes) {
            res.status(200).send(updatedClothes);
        } else {
            res.status(404).send({ message: "Clothes not found "});
        }
    } catch (e) {
        next(e);
    }
});

// Route to delete a specific clothes item by ID
router.delete('/clothes/:id', async (req, res, next) => {
    try {
        const result = await clothesCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Customer not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
