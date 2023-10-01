'use strict';

const express = require('express');
const { clothesModel } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
    const clothes = await clothesModel.findAll();
    res.status(200).send(clothes);
});

router.post('/clothes', async (req, res, next) => {
    try {
        const newClothes = await clothesModel.create(req.body);
        res.status(200).send(newClothes);
    } catch (e) {
        next(3)
    }
});

module.exports = router;