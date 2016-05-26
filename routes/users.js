var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

/* CREATE User */
router.post('/', function (req, res, next) {
  // TODO: check request data validation
  var user = User.build({
    userId: req.body.userId,
    password: req.body.password,
    grade: req.body.grade,
    name: req.body.name
  });
  user.save().then(function () {
    res.status(200).json({message: 'success'});
  }).catch(function (error) {
    res.status(400).json({message: error});
  });
});

/* READ User one */
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
        message: 'not found'
      });
  });
});

module.exports = router;
