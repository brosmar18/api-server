'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);

module.exports = {
    sequelizeDatabase,
    foodModel,
};