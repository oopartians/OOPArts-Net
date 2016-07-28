module.exports = function(sequelize, DataTypes) {
    var PostingTag = sequelize.define('PostingTag', {}, {
        freezeTableName: true
    });
    return PostingTag;
};