module.exports = function(sequelize, DataTypes) {
    var Posting = sequelize.define('Posting', {
        postingKey: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        view: DataTypes.INTEGER,
        star: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Posting.hasMany(models.Comment, { foreignKey: 'postingKey' });
                Posting.belongsToMany(models.Tag, { foreignKey: 'postingKey', through: models.PostingTag });
                Posting.belongsTo(models.User, { foreignKey: 'userKey' });
            }
        }
    });
    return Posting;
};