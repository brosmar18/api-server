'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');
const customer= require('./customer');
const student = require('./student');
const course = require('./course');
const studentDetails = require('./studentDetails');
const Collection = require('./collection');


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);
const customerModel = customer(sequelizeDatabase, DataTypes);
const studentModel = student(sequelizeDatabase, DataTypes);
const courseModel = course(sequelizeDatabase, DataTypes);
const studentDetailsModel = studentDetails(sequelizeDatabase, DataTypes);

// Define the many-to-many association
studentModel.belongsToMany(courseModel, { through: 'StudentCourses' });
courseModel.belongsToMany(studentModel, { through: 'StudentCourses' });

// Define the one-to-one association
studentModel.hasOne(studentDetailsModel, { onDelete: 'CASCADE' });
studentDetailsModel.belongsTo(studentModel);


module.exports = {
    sequelizeDatabase,
    customerCollection: new Collection(customerModel),
    foodCollection: new Collection(foodModel),
    clothesCollection: new Collection(clothesModel),
    studentCollection: new Collection(studentModel),
    courseCollection: new Collection(courseModel),
    studentDetailsCollection: new Collection(studentDetailsModel),
};