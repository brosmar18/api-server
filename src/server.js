'use strict';

const express = require('express');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);

app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

module.exports = { start, app };