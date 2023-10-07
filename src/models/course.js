'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('course', {
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
