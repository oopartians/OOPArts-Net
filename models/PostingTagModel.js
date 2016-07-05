var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');
var Posting = require('./PostingModel');

var PostingTag = sequelize.define('posting-tag', {
}, {
    freezeTableName : true
});

PostingTag.hasOne(Posting, { foreignKey: 'postingKey', constraints:false });
PostingTag.hasOne(Tag, { foreignKey: 'tagKey' , constraints:false});

PostingTag.sync({ force: true });

module.exports = PostingTag;