'use strict';

const express = require('express');
const { studentDetailsCollection } = require('../models');

const router = express.Router();

router.get('/studentDetails', async (req, res, next) => {
    const details = await studentDetailsCollection.read();
    res.status(200).send(details);
});

router.get('/studentDetails/:id', async (req, res, next) => {
    const singleDetailRecord = await studentDetailsCollection.read(req.params.id);
    res.status(200).send(singleDetailRecord);
});

router.post('/studentDetails', async (req, res, next) => {
    try {
        const newDetail = await studentDetailsCollection.create(req.body);
        res.status(200).send(newDetail);
    } catch (e) {
        next(e);
    }
});

router.put('/studentDetails/:id', async (req, res, next) => {
    try {
        const updatedDetail = await studentDetailsCollection.update(req.params.id, req.body);
        if (updatedDetail) {
            res.status(200).send(updatedDetail);
        } else {
            res.status(404).send({ message: "Detail not found "});
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/studentDetails/:id', async (req, res, next) => {
    try {
        const result = await studentDetailsCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Detail not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
