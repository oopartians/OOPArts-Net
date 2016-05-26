var Sequelize = require('sequelize');
var sequelize = require('../config/develop');

var Tag = sequelize.define('tag', {
    tagKey: Sequelize.INTEGER,
    name: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM,
        values: ['parent', 'child']
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Tag.sync({force: true}).then(function () {
    return Tag.create({
        tagKey: '1',
        name: 'pracTag',
        role: 'parent'
    });
});

module.exports = Tag;