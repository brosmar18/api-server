'use strict';

const express = require('express');
const { courseCollection } = require('../models');

const router = express.Router();

// Route to get all courses
router.get('/course', async (req, res, next) => {
    try {
        const courses = await courseCollection.read();
        res.status(200).send(courses);
    } catch (e) {
        next(e);
    }
});

// Route to get a specific course by ID
router.get('/course/:id', async (req, res, next) => {
    try {
        const singleCourseRecord = await courseCollection.read(req.params.id);
        if (singleCourseRecord) {
            res.status(200).send(singleCourseRecord);
        } else {
            res.status(404).send({ message: 'Course not found' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to get all students enrolled in a specific course
router.get('/course/:courseId/students', async (req, res, next) => {
    try {
        const course = await courseCollection.read(req.params.courseId);
        if (course) {
            const students = await course.getStudents();
            res.status(200).send(students);
        } else {
            res.status(404).send({ message: 'Course not found' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to create a new course
router.post('/course', async (req, res, next) => {
    try {
        const newCourse = await courseCollection.create(req.body);
        if (newCourse) {
            res.status(201).send(newCourse);
        } else {
            res.status(400).send({ message: 'Bad Request' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to update a specific course by ID
router.put('/course/:id', async (req, res, next) => {
    try {
        const updatedCourse = await courseCollection.update(req.params.id, req.body);
        if (updatedCourse) {
            res.status(200).send(updatedCourse);
        } else {
            res.status(404).send({ message: "Course not found" });
        }
    } catch (e) {
        next(e);
    }
});

// Route to delete a specific course by ID
router.delete('/course/:id', async (req, res, next) => {
    try {
        const result = await courseCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Course not found or not deleted" });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
