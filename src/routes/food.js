'use strict';

const express = require('express');
const { foodCollection } = require('../models');

const router = express.Router();

// Route to retrieve all food items
router.get('/food', async (req, res, next) => {
    const food = await foodCollection.read();
    res.status(200).send(food);
});

// Route to retrieve a specific food item by ID
router.get('/food/:id', async (req, res, next) => {
    try {
        const singleFoodItem = await foodCollection.read(req.params.id);
        if (singleFoodItem) {
            res.status(200).send(singleFoodItem);
        } else {
            res.status(404).send({ message: "Food not found" });
        }
    } catch (e) {
        next(e);
    }
});

// Route to create a new food item
router.post('/food', async (req, res ,next) => {
    try {
        console.log('This is the body', req.body);
        const newFood = await foodCollection.create(req.body);
        res.status(201).send(newFood);
    } catch (e) {
        next(e);
    }
});

// Route to update details of an existing food item by ID
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

// Route to delete a specific food item by ID
router.delete('/food/:id', async (req, res, next) => {
    try {
        const result = await foodCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(204).send(result);
        } else {
            res.status(404).send({ message: "Food not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
