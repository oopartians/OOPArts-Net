module.exports = function(sequelize, DataTypes) {
    var HierarchyTag = sequelize.define('hierarchytag', {
        parentKey: { type: DataTypes.INTEGER, validate: { notNull: true } },
        childKey: { type: DataTypes.INTEGER, validate: { notNull: true } }
    }, {
        tableName: 'hierarchytag',
        freezeTableName: true
    });

    return HierarchyTag;
}