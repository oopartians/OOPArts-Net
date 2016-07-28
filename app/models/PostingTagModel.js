module.exports = function(sequelize, DataTypes) {
    var PostingTag = sequelize.define('postingtag', {
        //postingKey: { type: DataTypes.INTEGER, references: { model: 'posting', key: 'postingKey' } },
        //tagKey: { type: DataTypes.INTEGER, references: { model: 'tag', key: 'tagKey' } }
    }, {
        tablesName: 'postingtag',
        freezeTableName: true
        //classMethods: {
          //  associate: function(models) {
            //    PostingTag.belongsTo(models.posting, { foreignKey: 'postingKey', targetKey: 'postingKey' });
              //  PostingTag.belongsTo(models.tag, { foreignKey: 'tagkey', targetKey: ' tagKey' });
            //}
        //}
    });

    return PostingTag;
}