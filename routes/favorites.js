var express = require('express');
var router = express.Router();
var User = require('../models/UserModel')
var Favorite = require('../models/FavoriteModel');
var FavoriteTag = require('../models/FavoriteTagModel');
var Tag = require('../models/TagModel');

(function () {

    function findTagKey(tagName) {
        Tag.findOne({
            where: {
                name: String(tagName)
            }
        }).then(function (tag) {
            if (tag != null)
                return tag.tagKey;
            else
                return null;
        });
    }

    function findUserKey(userID) {
        User.findOne({
            where: {
                userId: String(userID)
            }
        }).then(function (user) {
            if (user != null)
                return user.userKey;
            else
                return null;
        });
    }

    router.post('/', function (req, res, next) {
        var userName = req.body.name;
        var tags = req.body.tags;
        var userID = req.body.userId;
        var i;

        var userKey = findUserKey(userID);
        if(userKey == null)
            res.status(404).json({
                message: 'user not found who have ID of'+userID
            });

        var tagKeys = {};
        for(i = 0; i < tags.length; i++){
            tagKeys[i] = findTagKey(tags[i]);
        }

        User.findOne({
            where: {
                userId: String(userID)
            }
        }).then(function (user) {
            if (user != null){
                var userKey = user.userKey;
                var favorite = Favorite.build({
                    userKey : userKey,
                    name : userName
                });

                favorite.save().then(function () {
                    res.status(200).json({message: 'success'});
                }).catch(function (error) {
                    res.status(400).json({message: error});
                });

                var favoriteTagList = {};
                for(i = 0; i < tags.length; i++){
                    favoriteTagList[i] = FavoriteTag.build({

                    });
                }
            }
            else
                res.status(404).json({
                    message: 'user not found who have ID of'+userID
                });
        });
    });

    /* READ User one */
    router.get('/:userId', function (req, res, next) {
        User.findOne({
            where: {
                userId: String(req.params.userId)
            }
        }).then(function (user) {
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
})();

module.exports = router;