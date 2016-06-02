var Sequelize = require('sequelize');
var sequelize = require('../config/develop');

var Tag = sequelize.define('tag', {
    tagKey: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        values: ['parent', 'child']
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Tag.sync({force: true});

module.exports = Tag;