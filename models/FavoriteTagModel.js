var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');
var Favorite = require('./FavoriteModel');

var FavoriteTag = sequelize.define('favorite-tag', {
}, {
    freezeTableName : true
});
FavoriteTag.hasOne(Favorite, { foreignKey: 'favoriteKey' });
FavoriteTag.hasOne(Tag, { foreignKey: 'tagKey' });


FavoriteTag.sync({ force: true });

module.exports = FavoriteTag;