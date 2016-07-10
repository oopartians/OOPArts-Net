/**
 * Created by MinHo on 2016-07-06.
 */
var Sequelize = require('sequelize');
var sequelize = require('../config/develop');
var Tag = require('./TagModel');

var HierarchyTag = sequelize.define('hierarchytag', {
}, {
    freezeTableName : true
});

HierarchyTag.hasOne(Tag, { as: 'parentKey', foreignKey: 'tagKey', constraints : false });
HierarchyTag.hasOne(Tag, { as: 'childKey', foreignKey: 'tagKey', constraints : false });

HierarchyTag.sync({ force: true });

module.exports = HierarchyTag;