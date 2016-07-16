var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');
var Favorite = require('./FavoriteModel');

var FavoriteTag = sequelize.define('favoriteTag', {
}, {
    freezeTableName : true
});

FavoriteTag.hasOne(Favorite, { foreignKey: 'favoriteKey', constraints:false });
FavoriteTag.hasOne(Tag, { foreignKey: 'tagKey' , constraints:false});

FavoriteTag.sync({ force: true });

module.exports = FavoriteTag;