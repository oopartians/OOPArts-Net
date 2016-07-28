'use strict';

module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        tagKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING,
        role: { type: DataTypes.ENUM, values: ['parent', 'child'] }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Tag.belongsToMany(models.Favorite, { foreignKey: 'tagKey', through : models.FavoriteTag });
                Tag.belongsToMany(models.Posting, { foreignKey: 'tagKey', through: models.PostingTag });
            }
        }
    });
    return Tag;
};