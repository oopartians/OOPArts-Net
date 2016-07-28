'use strict';

module.exports = function(sequelize, DataTypes) {
    var HierarchyTag = sequelize.define('HierarchyTag', {
        parentKey: { type: DataTypes.INTEGER, validate: { notNull: true } },
        childKey: { type: DataTypes.INTEGER, validate: { notNull: true } }
    }, {
        freezeTableName: true
    });

    return HierarchyTag;
};