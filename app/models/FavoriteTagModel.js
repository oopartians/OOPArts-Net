module.exports = function(sequelize, DataTypes) {
    var FavoriteTag = sequelize.define('favoritetag', {}, {
        tableName: 'favoritetag',
        freezeTableName: true
    });

    return FavoriteTag;
}
