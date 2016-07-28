'use strict';

module.exports = function(sequelize, DataTypes) {
    var FavoriteTag = sequelize.define('FavoriteTag', {}, {
        freezeTableName: true
    });

    return FavoriteTag;
};
