'use strict';

const express = require('express');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const customerRouter = require('./routes/customer');
const studentRouter = require('./routes/student');
const courseRouter = require('./routes/course');
const studentDetailsRouter = require('./routes/studentDetails');
const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);
app.use(customerRouter);
app.use(studentRouter);
app.use(courseRouter);
app.use(studentDetailsRouter);
app.use(authorRouter);
app.use(bookRouter);

app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
});

app.get('/error', (req, res, next) => {
    // Trigger the 500 error handler for testing.
    throw new Error('Forced Error for Testing');
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

module.exports = { start, app };