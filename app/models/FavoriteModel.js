module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define('favorite', {
        favoriteKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, validate: { notNull: true } },
        //userKey: { type: DataTypes.INTEGER, references: { model: 'user', key: 'userKey' } }
    }, {
        tableName: 'favorite',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Favorite.hasMany(models.favoritetag, { foreignKey: 'favoriteKey' });
                //Favorite.belongsTo(models.user, { foreignKey: 'userKey', targetKey: 'userKey' });
            }
        }
    });

    return Favorite;
}