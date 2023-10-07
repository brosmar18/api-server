'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('studentDetail', {
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
};
