var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');
var Posting = require('./PostingModel');

var PostingTag = sequelize.define('postingtag', {
}, {
    freezeTableName : true
});

Posting.hasMany(PostingTag, { foreignKey: 'postingKey', constraints : false });
//PostingTag.belongsTo(Posting, { foreignKey : 'id', constraints : false });

Tag.hasMany(PostingTag, { foreignKey: 'tagKey', constraints : false });
//PostingTag.belongsTo(Tag, { foreignKey : 'id', constraints : false });

PostingTag.sync({ force: true });

module.exports = PostingTag;