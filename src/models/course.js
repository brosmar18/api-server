'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    const course = sequelizeDatabase.define('course', {
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
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'students', // name of the table, not the model
                key: 'id'
            }
        }
    });

    course.associate = (models) => {
        course.belongsTo(models.student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };

    return course;
};
