'use strict';

const express = require('express');
const { foodCollection } = require('../models');

const router = express.Router();

router.get('/food', async (req, res, next) => {
    const food = await foodCollection.read();
    res.status(200).send(food);
});


router.get('/food/:id', async (req, res, next) => {
    const singleFoodItem = await foodCollection.read(req.params.id);
    res.status(200).send(singleFoodItem);
});

router.post('/food', async (req, res ,next) => {
    try {
        console.log('This is the body', req.body);
        const newFood = await foodCollection.create(req.body);
        res.status(200).send(newFood);
    } catch (e) {
        next(e);
    }
});

router.put('/food/:id', async (req, res, next) => {
    try {
        const updatedFood = await foodCollection.update(req.params.id, req.body);
        if (updatedFood) {
            res.status(200).send(updatedFood);
        } else {
            res.status(404).send({ message: "Food not found"});
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/food/:id', async (req, res, next) => {
    try {
        const result = await foodCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Food not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;