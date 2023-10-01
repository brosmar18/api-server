'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('clothes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.ENUM,
            values: ['small', 'medium', 'large'],
            allowNull: false,
        },
    });
};