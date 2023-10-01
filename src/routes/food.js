'use strict';

const express = require('express');
const { foodModel } = require('../models');

const router = express.Router();

router.get('/food', async (req, res, next) => {
    const food = await foodModel.findAll();
    res.status(200).send(food);
});

router.post('/food', async (req, res, next) => {
    try {
        const newFood = await foodModel.create(req.body);
        res.status(200).send(newFood);
    } catch (e) {
        next(e);
    }
});

router.get('/food/:id', async (req, res, next) => {
    try {
        const food = await foodModel.findByPk(req.params.id);
        if (food) {
            res.status(200).send(food);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

router.put('/food/:id', async (req, res, next) => {
    try {
        const food = await foodModel.findByPk(req.params.id);
        if (food) {
            const updatedFood = await food.update(req.body);
            res.status(200).send(updatedFood);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/food/:id', async (req, res, next) => {
    try {
        const food = await foodModel.findByPk(req.params.id);
        if (food) {
            await food.destroy();
            res.status(200).send(null); 
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;