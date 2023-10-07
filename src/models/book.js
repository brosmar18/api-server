module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publicationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'book'  // Explicitly specify the table name
    });
};
