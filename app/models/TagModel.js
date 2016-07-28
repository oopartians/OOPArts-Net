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
                Tag.belongsToMany(models.favorite, { foreignKey: 'tagKey', through : models.favoritetag });
                Tag.belongsToMany(models.posting, { foreignKey: 'tagKey', through: models.postingtag });
            }
        }
    });

    return Tag;
}