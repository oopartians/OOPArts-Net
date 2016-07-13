﻿var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var User = require('./UserModel');
var Posting = require('./PostingModel');

var Comment = sequelize.define('comment', {
    commentKey: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    comment: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM,
        values: ['normal', 'dropped']
    }
}, {
    freezeTableName : true
});

Posting.hasMany(Comment, { foreignKey: 'postingKey', constraints : false });
// Comment.belongsTo(Posting, { foreignKey : 'postingKey', targetKey : 'postingKey', constraints : false });

User.hasMany(Comment, { foreignKey: 'userKey', constraints : false });
// Comment.belongsTo(User, { foreignKey : 'userKey', targetKey : 'userKey', constraints : false });

Comment.sync({ force: true });

module.exports = Comment;