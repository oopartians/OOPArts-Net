module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define('favorite', {
        favoriteKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, validate: { notNull: true } },
    }, {
        tableName: 'favorite',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Favorite.belongsToMany(models.tag, { foreignKey: 'favoriteKey', through: models.favoritetag });
            }
        }
    });

    return Favorite;
}