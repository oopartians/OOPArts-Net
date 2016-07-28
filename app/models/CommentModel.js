'use strict';

module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        commentKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        comment: DataTypes.STRING,
        status: { type: DataTypes.ENUM, values: ['normal', 'dropped'] }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                Comment.belongsTo(models.User, { foreignKey: 'userKey' });
                Comment.belongsTo(models.Posting, { foreignKey: 'postingKey' });
            }
        }
    });

    return Comment;
};
