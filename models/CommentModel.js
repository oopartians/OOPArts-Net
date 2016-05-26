﻿var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var User = require('./UserModel');
var Posting = require('./PostingModel');

var Comment = sequelize.define('comment', {
    commentKey: { type: Sequelize.INTEGER, autoIncrement: true },
    createdAt: Sequelize.DATE,
    comment: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM,
        values: ['normal', 'dropped']
    }
}, {
    freezeTableName : true
});
Comment.hasOne(Posting, { foreignKey: 'postingKey' });
Comment.hasOne(User, { foreignKey: 'userKey' });

Comment.sync({ force: true });

module.exports = Comment;