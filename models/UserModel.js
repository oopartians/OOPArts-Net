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

var Tag;

var Favorite = sequelize.define('favorite', {
    favoriteKey: { type: Sequelize.INTEGER, autoIncrement: true },
    name: { type: Sequelize.STRING, validate: { notNull: true } }
}, {
    freezeTableName : true
});
Favorite.hasOne(User, { foreignKey: 'userKey' });

var Favorite_Tag = sequelize.define('favorite-tag', {
}, {
    freezeTableName : true
});
Favorite_Tag.hasOne(Favorite, { foreignKey: 'favoriteKey' });
Favorite_Tag.hasOne(Tag, { foreignKey: 'tagKey' });

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