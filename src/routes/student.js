'use strict';

const express = require('express');
const { studentCollection, courseCollection } = require('../models');

const router = express.Router();

router.get('/student', async (req, res, next) => {
    const student = await studentCollection.read();
    res.status(200).send(student);
});

router.get('/student/:id', async (req, res, next) => {
    const singleStudentRecord = await studentCollection.read(req.params.id);
    res.status(200).send(singleStudentRecord);
});

router.post('/student', async (req, res, next) => {
    try {
        console.log('This is the body, req.body');
        const newStudent = await studentCollection.create(req.body);
        res.status(200).send(newStudent);
    } catch (e) {
        next(e);
    }
});

router.put('/student/:id', async (req, res, next) => {
    try {
        const updatedStudent = await studentCollection.update(req.params.id, req.body);

        if (updatedStudent) {
            res.status(200).send(updatedStudent);
        } else {
            res.status(404).send({ message: "Student not found "});
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/student/:id', async (req, res, next)=> {
    try {
        const result = await studentCollection.delete(req.params.id);
        if (result.message === 'Record deleted successfully') {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "Student not found or not deleted" })
        }
    } catch (e) {
        next(e);
    }
});


router.post('/student/:studentId/enroll/:courseId', async (req, res, next) => {
    try {
        const student = await studentCollection.read(req.params.studentId);
        const course = await courseCollection.read(req.params.courseId);
        if (student && course) {
            await student.addCourse(course);
            res.status(200).send({ message: 'Student enrolled in course successfully' });
        } else {
            res.status(404).send({ message: 'Student or Course not found'});
        }
    } catch (e) {
        next(e);
    }
});

router.get('/student/:studentId/courses', async (req, res, next) => {
    try {
        const student = await studentCollection.read(req.params.studentId);
        if (student) {
            const courses = await student.getCourses();
            res.status(200).send(courses);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;