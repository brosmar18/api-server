'use strict';

const express = require('express');
const { foodModel } = require('../models');

const router = express.Router();

router.post('/food', async (req, res, next) => {
    try {
        const newFood = await foodModel.create(req.body);
        res.status(200).send(newFood);
    } catch (e) {
        next(e);
    }
});

module.exports = router;