'use strict';

const express = require('express');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
});

const start = () => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

module.exports = { start, app };