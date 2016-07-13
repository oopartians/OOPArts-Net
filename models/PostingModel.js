var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var user = require('./UserModel');

var Posting = sequelize.define('posting', {
    postingKey: {
        type         : Sequelize.INTEGER,
        autoIncrement: true,
        unique       : true,
        primaryKey   : true
    },
    title    : Sequelize.STRING,
    createdAt: Sequelize.DATE,
    content  : Sequelize.STRING,
    view     : Sequelize.INTEGER,
    star     : Sequelize.INTEGER
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

user.hasOne(Posting, { foreignKey : 'userKey', constraints : false });

Posting.sync({force: true});

module.exports = Posting;