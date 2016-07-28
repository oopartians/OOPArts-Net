module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('tag', {
        tagKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING,
        role: { type: DataTypes.ENUM, values: ['parent', 'child'] }
    }, {
        tableName: 'tag',
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Tag.hasMany(models.favoritetag, { foreignKey: 'tagKey' });
                Tag.hasMany(models.posting, { foreignKey: 'tagKey' });
            }
        }
    });

    return Tag;
}