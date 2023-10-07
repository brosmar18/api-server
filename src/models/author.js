'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('author', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
