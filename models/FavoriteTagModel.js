var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');
var Favorite = require('./FavoriteModel');

var FavoriteTag = sequelize.define('favoritetag', {
}, {
    freezeTableName : true
});

Favorite.hasMany(FavoriteTag, { foreignKey: 'favoriteKey', constraints : false });
//FavoriteTag.belongsTo(Favorite, { foreignKey : 'favoriteId', constraints : false });

Tag.hasMany(FavoriteTag, { foreignKey: 'tagKey', constraints : false });
//FavoriteTag.belongsTo(Tag, { foreignKey : 'tagId', constraints : false });

FavoriteTag.sync({ force: true });

module.exports = FavoriteTag;