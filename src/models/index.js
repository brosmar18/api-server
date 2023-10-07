'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');
const customer= require('./customer');
const student = require('./student');
const course = require('./course');
const studentDetails = require('./studentDetails');
const author = require('./author');
const book = require('./book');
const Collection = require('./collection');


// const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;
const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  logging: process.env.NODE_ENV !== 'test' ? console.log : false
});


// const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);
const customerModel = customer(sequelizeDatabase, DataTypes);
const studentModel = student(sequelizeDatabase, DataTypes);
const courseModel = course(sequelizeDatabase, DataTypes);
const studentDetailsModel = studentDetails(sequelizeDatabase, DataTypes);
const authorModel = author(sequelizeDatabase, DataTypes);
const bookModel = book(sequelizeDatabase, DataTypes);

// Define the many-to-many association
studentModel.belongsToMany(courseModel, { through: 'StudentCourses' });
courseModel.belongsToMany(studentModel, { through: 'StudentCourses' });

// Define the one-to-one association
studentModel.hasOne(studentDetailsModel, { onDelete: 'CASCADE' });
studentDetailsModel.belongsTo(studentModel);

// Define the one-to-many association
authorModel.hasMany(bookModel, { foreignKey: 'authorId', sourceKey: 'id' });
bookModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });


module.exports = {
    sequelizeDatabase,
    customerCollection: new Collection(customerModel),
    foodCollection: new Collection(foodModel),
    clothesCollection: new Collection(clothesModel),
    studentCollection: new Collection(studentModel),
    courseCollection: new Collection(courseModel),
    studentDetailsCollection: new Collection(studentDetailsModel),
    authorCollection: new Collection(authorModel),
    bookCollection: new Collection(bookModel),
};