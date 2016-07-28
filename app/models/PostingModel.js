module.exports = function(sequelize, DataTypes) {
    var Posting = sequelize.define('posting', {
        postingKey: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        view: DataTypes.INTEGER,
        star: DataTypes.INTEGER
    }, {
        tableName: 'posting',
        classMethod: {
            associate: function(models) {
                Posting.hasMany(models.postingtag, { foreignKey: 'postingKey' });
            }
        }
    });

    return Posting;
}