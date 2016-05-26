var Sequelize = require('sequelize');
var sequelize = require('../config/develop');

var User = sequelize.define('user', {
  userKey: { type: Sequelize.INTEGER, autoIncrement: true , primaryKey: true},
  userId: { type: Sequelize.STRING, unique: true, primaryKey: true },
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  grade: Sequelize.INTEGER,
  exp: Sequelize.BIGINT,
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'inactive', 'pending', 'dropped']
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  return User.create({
    userKey: 1,
    userId: 'user1',
    password: 'password',
    name: 'GyeongMo',
    image: 'asdf.png',
    grade: 12,
    exp: 10000,
    status: 'active'
  });
});

module.exports = User;