/**
 * Created by MinHo on 2016-07-06.
 */
var Sequelize = require('sequelize');
var sequelize = require('../../config/develop');
var Tag = require('./TagModel');

var HierarchyTag = sequelize.define('hierarchytag', {
    parentKey: {type: Sequelize.INTEGER, validate: { notNull: true }},
    childKey: {type: Sequelize.INTEGER, validate: { notNull: true }}
}, {
    freezeTableName : true
});

HierarchyTag.sync({ force: true });

module.exports = HierarchyTag;