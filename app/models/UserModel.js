module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        userKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.STRING, unique: true }, // , primaryKey: true
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        grade: DataTypes.INTEGER,
        exp: DataTypes.BIGINT,
        status: { type: DataTypes.ENUM, values: ['active', 'inactive', 'pending', 'dropped'], defaultValue: 'pending' }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Comment, { foreignKey: 'userKey' });
                User.hasMany(models.Favorite, { foreignKey: 'userKey' });
                User.hasMany(models.Posting, { foreignKey: 'userKey' });
            }
        }
    });

    return User;
};