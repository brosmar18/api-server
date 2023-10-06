'use strict';

const express = require('express');
const { clothesCollection } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
    const clothes = await clothesCollection.read();
    res.status(200).send(clothes);
});


router.get('/clothes/:id', async (req, res, next) => {
    const singleClothesItem = await clothesCollection.read(req.params.id);
    res.status(200).send(singleClothesItem);
});

router.post('/clothes', async (req, res, next) => {
    try {
        console.log('This is the body', req.body);
        const newClothes = await clothesCollection.create(req.body);
        res.status(200).send(newClothes);
    } catch (e) {
        next(e);
    }
});

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