'use strict';

const express = require('express');
const { studentDetailsCollection, studentCollection } = require('../models');

const router = express.Router();

// Route to get all student details
router.get('/studentDetails', async (req, res, next) => {
    const details = await studentDetailsCollection.read();
    res.status(200).send(details);
});

// Route to get a specific student detail by ID and include the associated student data
router.get('/studentDetails/:id', async (req, res, next) => {
    try {
        const singleDetailRecord = await studentDetailsCollection.read(req.params.id, {
            include: [{
                model: studentCollection.model, // Use the studentCollection's model
                as: 'student' // This should match the association name you set in the model
            }]
        });
        if (singleDetailRecord) {
            res.status(200).send(singleDetailRecord);
        } else {
            res.status(404).send({ message: 'Student Details not found' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to create a new student detail
router.post('/studentDetails', async (req, res, next) => {
    try {
        const newDetail = await studentDetailsCollection.create(req.body);
        res.status(200).send(newDetail);
    } catch (e) {
        next(e);
    }
});

// Route to update a specific student detail by ID
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

// Route to delete a specific student detail by ID
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
