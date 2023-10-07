'use strict';

const express = require('express');
const { courseCollection } = require('../models');

const router = express.Router();

router.get('/course', async (req, res, next) => {
    const course = await courseCollection.read();
    res.status(200).send(course);
});

router.get('/course/:id', async (req, res, next) => {
    const singleCourseRecord = await courseCollection.read(req.params.id);
    res.status(200).send(singleCourseRecord);
});

router.post('/course', async (req, res, next) => {
    try {
        console.log('This is the body, req.body');
        const newCourse = await courseCollection.create(req.body);
        res.status(200).send(newCourse);
    } catch (e) {
        next(e);
    }
});

router.put('/course/:id', async (req, res, next) => {
    try {
        const updatedCourse = await courseCollection.update(req.params.id, req.body);

        if (updatedCourse) {
            res.status(200).send(updatedCourse);
        } else {
            res.status(404).send({ message: "Course not found "});
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/course/:id', async (req, res, next)=> {
    try {
        const result = await courseCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Course not found or not deleted" })
        }
    } catch (e) {
        next(e);
    }
});



module.exports = router;