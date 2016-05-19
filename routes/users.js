var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  User.findOne({
    where: {
      userId: String(req.params.userId)
    }}).then(function (user) {
    if (user != null)
      res.status(200).json({
        userId: user.userId,
        exp: user.exp,
        image: user.image,
        grade: user.grade,
        name: user.name,
        userKey: user.userKey,
        status: user.status
      });
    else
      res.status(404).json({
        message: 'not found user'
      });
  });
});

module.exports = router;
