module.exports = function(sequelize, DataTypes) {
    var PostingTag = sequelize.define('postingtag', {}, {
        tablesName: 'postingtag',
        freezeTableName: true
    });

    return PostingTag;
}