﻿var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var User = require('./UserModel');

var Favorite = sequelize.define('favorite', {
    favoriteKey: { type: Sequelize.INTEGER, autoIncrement: true },
    name: { type: Sequelize.STRING, validate: { notNull: true } }
}, {
    freezeTableName : true
});
Favorite.hasOne(User, { foreignKey: 'userKey' });

Favorite.sync({ force: true });

module.exports = Favorite;