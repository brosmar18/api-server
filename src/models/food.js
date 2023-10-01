'use strict';


module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('food', {
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        availability: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    })
};