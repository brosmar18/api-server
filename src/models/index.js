'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);

module.exports = {
    sequelizeDatabase,
    foodModel,
    clothesModel,
};