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
    star     : Sequelize.INTEGER,
    userKey  : {
        type : Sequelize.INTEGER,
        references: {
            model: user,
            key: 'userKey'
        }
    }//,
    // status: {
    //     type: Sequelize.ENUM,
    //     values: ['active', 'inactive', 'pending', 'dropped']
    // }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Posting.sync({force: true}).then(function () {
    return Posting.create({
        title: 'testPosting',
        content: '완성!'//,
        //tag:
    });
});

module.exports = Posting;