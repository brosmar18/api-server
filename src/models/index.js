'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');
const customer= require('./customer');
const student = require('./student');
const Collection = require('./collection');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);
const customerModel = customer(sequelizeDatabase, DataTypes);
const studentModel = student(sequelizeDatabase, DataTypes);

module.exports = {
    sequelizeDatabase,
    customerCollection: new Collection(customerModel),
    foodCollection: new Collection(foodModel),
    clothesCollection: new Collection(clothesModel),
    studentCollection: new Collection(studentModel)
};