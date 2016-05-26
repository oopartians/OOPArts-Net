var Sequelize = require('sequelize');
var sequelize = require('../config/develop');

var User = sequelize.define('user', {
  userId: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  exp: Sequelize.BIGINT,
  image: Sequelize.STRING,
  grade: Sequelize.INTEGER,
  name: Sequelize.STRING,
  userKey: { type: Sequelize.INTEGER, autoIncrement: true },
  status: {
    type: Sequelize.ENUM,
    values: ['active', 'inactive', 'pending', 'dropped']
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  return User.create({
    userId: 'user1',
    password: 'password',
    exp: 10000,
    image: 'asdf.png',
    grade: 12,
    name: 'GyeongMo',
    userKey: 'asdf',
    status: 'active'
  });
});

module.exports = User;