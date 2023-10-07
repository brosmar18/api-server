'use strict';

const express = require('express');
const { studentCollection, courseCollection, studentDetailsCollection } = require('../models');

const router = express.Router();

// Route to get all students
router.get('/student', async (req, res, next) => {
    const student = await studentCollection.read();
    res.status(200).send(student);
});

// Route to get a specific student by ID and include their details
router.get('/student/:id', async (req, res, next) => {
    try {
        const student = await studentCollection.read(req.params.id);
        if (student) {
            const details = await student.getStudentDetail();
            res.status(200).send({ ...student.toJSON(), details });
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to create a new student
router.post('/student', async (req, res, next) => {
    try {
        const newStudent = await studentCollection.create(req.body);
        res.status(200).send(newStudent);
    } catch (e) {
        next(e);
    }
});

// Route to update a specific student by ID
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

// Route to delete a specific student by ID
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

// Route to enroll a student in a specific course
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

// Route to get all courses a specific student is enrolled in
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

// Route to get details of a specific student by ID
router.get('/student/:id/details', async (req, res, next) => {
    try {
        const student = await studentCollection.read(req.params.id);
        if (student) {
            const details = await student.getStudentDetail();
            res.status(200).send(details);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (e) {
        next(e);
    }
});

// Route to create or update details for a specific student by ID
router.post('/student/:id/details', async (req, res, next) => {
    try {
        const student = await studentCollection.read(req.params.id);
        if (student) {
            const details = await studentDetailsCollection.create(req.body);
            await student.setStudentDetail(details);
            res.status(200).send(details);
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
