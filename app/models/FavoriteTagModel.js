module.exports = function(sequelize, DataTypes) {
    var FavoriteTag = sequelize.define('favoritetag', {
       // favoriteKey: { type: DataTypes.INTEGER, references: { model: 'favorite', key: 'favoriteKey' } },
        //tagKey: { type: DataTypes.INTEGER, references: { model: 'tag', key: 'tagKey' } }
    }, {
        tableName: 'favoritetag',
        //classMethods: {
          //  associate: function(models) {
            //    FavoriteTag.belongsTo(models.favorite, { foreignKey: 'favoriteKey', targetKey: 'favoriteKey' });
              //  FavoriteTag.belongsTo(models.tag, { foreignKey : 'tagKey', targetKey: 'tagKey' });
           // }
       // }
    });

    return FavoriteTag;
}
