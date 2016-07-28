module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define('comment', {
        commentKey: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        comment: DataTypes.STRING,
        status: { type: DataTypes.ENUM, values: ['normal', 'dropped'] }
    }, {
        tableName: 'comment',
        freezeTableName: true
    });

    return Comment;
}
