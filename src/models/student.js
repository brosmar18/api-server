'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    const student = sequelizeDatabase.define('student', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    student.associate = (models) => {
        student.hasOne(models.studentDetail, {
            foreignKey: 'studentId',
            as: 'details'
        });
    };

    return student;
};
