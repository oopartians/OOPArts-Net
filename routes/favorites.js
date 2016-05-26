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

    function findTagName(tagKey) {
        Tag.findOne({
            where: {
                tagKey: String(tagKey)
            }
        }).then(function (tag) {
            if (tag != null)
                return tag.name;
            else
                return null;
        });
    }

    function findTagsOfKey(favoriteKey){
        var i = 0;
        var tags = [];
        var temp;
        FavoriteTag.findAll({
            where:{
                favoriteKey : favoriteKey
            }
        }).then(function (favoriteTagList) {
            if(favoriteTagList != null){
                for(i = 0; i < favoriteTagList.length; i++){
                    temp = findTagName(favoriteTagList[i].tagKey);
                    if(temp == null)
                        continue;
                    tags.push(temp);
                }
                return tags;
            }else{
                return null;
            }
        });
    }

    router.post('/', function (req, res, next) {
        var tagName = req.body.name;
        var tags = req.body.tags;
        var userID = req.body.userId;
        var i;

        var userKey = findUserKey(userID);
        if(userKey == null){
            res.status(404).json({
                message: 'user not found who have ID of'+userID
            });
            return;
        }

        var tagKeys = {};
        for(i = 0; i < tags.length; i++){
            tagKeys[i] = findTagKey(tags[i]);
            if(tagKeys[i] == null){
                res.status(404).json({
                    message: 'tag not found which have name of'+tags[i]
                });
                return;
            }
        }

        var favorite = Favorite.build({
            userKey : userKey,
            name : tagName
        });
        favorite.save().then(function () {
            res.status(200).json({message: 'success'});
        }).catch(function (error) {
            res.status(400).json({message: error});
        });

        var favoriteTag = {};
        for(i = 0; i < tags.length; i++){
            favoriteTag[i] = FavoriteTag.build({
                favoriteKey: favorite.favoriteKey,
                tagKey: tagKeys[i]
            });
        }
    });

    /* READ User one */
    router.get('/', function (req, res, next) {
        var userID = req.body.userId;
        var userKey = findUserKey(userID);
        var i = 0;
        var favorites = [];
        var temp;
        Favorite.findAll({
            where:{
                userKey: userKey
            }
        }).then(function (favoriteList) {

            for(i = 0; i < favoriteList.length; i++){
                temp = {
                    name : favoriteList[i].name,
                    tags : findTagsOfKey(favoriteList[i].favoriteKey)
                };
                favorites.push(temp);
            }

            res.status(200).json({
                favorites: favorites
            });

        });
    });

})();

module.exports = router;