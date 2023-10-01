'use strict';

const express = require('express');
const { clothesModel, foodModel } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
    const clothes = await clothesModel.findAll();
    res.status(201).send(clothes);
});

router.post('/clothes', async (req, res, next) => {
    try {
        const newClothes = await clothesModel.create(req.body);
        res.status(201).send(newClothes);
    } catch (e) {
        next(e)
    }
});

router.get('/clothes/:id', async (req, res, next) => {
    try {
        const clothes = await clothesModel.findByPk(req.params.id);
        if (clothes) {
            res.status(200).send(clothes);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

router.put('/clothes/:id', async (req, res, next) => {
    try {
        const clothes = await clothesModel.findByPk(req.params.id);
        if (clothes) {
            const updatedClothes = await clothes.update(req.body);
            res.status(200).send(updatedClothes);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/clothes/:id', async (req, res, next) => {
    try {
        const clothes = await clothesModel.findByPk(req.params.id);
        if (clothes) {
            await clothes.destroy();
            res.status(201).send(null);
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;