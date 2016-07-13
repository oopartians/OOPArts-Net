var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var User = require('./UserModel');

var Favorite = sequelize.define('favorite', {
    favoriteKey: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, validate: { notNull: true } }
}, {
    freezeTableName : true
});

Favorite.hasOne(User, { foreignKey: 'favoriteKey' });
// User.belongsTo(Favorite, { foreignKey : 'favoritetagKey', targetKey : 'favoriteKey'});

Favorite.sync({ force: true });

module.exports = Favorite;