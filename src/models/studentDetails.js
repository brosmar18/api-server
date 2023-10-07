'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    const studentDetail = sequelizeDatabase.define('studentDetail', {
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emergencyContact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    studentDetail.associate = (models) => {
        studentDetail.belongsTo(models.student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };

    return studentDetail;
};
