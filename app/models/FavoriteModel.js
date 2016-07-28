module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define('Favorite', {
        favoriteKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, validate: { notNull: true } },
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Favorite.belongsTo(models.User, { foreignKey: 'userKey' });
                Favorite.belongsToMany(models.Tag, { foreignKey: 'favoriteKey', through: models.FavoriteTag });
            }
        }
    });

    return Favorite;
};