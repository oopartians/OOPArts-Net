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

    function findFavoriteKey(userKey, favoriteName) {
        Favorite.findOne({
            where: {
                userKey: String(userKey),
                name : String(favoriteName)
            }
        }).then(function (favorite) {
            if (favorite != null)
                return favorite.favoriteKey;
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
        var favoriteName = req.body.name;   // 즐찾 이름
        var tags = req.body.tags;           // [ 태그명 ]
        var userID = req.body.userId;       // 유저 아이디
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

        // 즐찾 테이블 추가
        Favorite.build({
            userKey : userKey,
            name : favoriteName
        }).save().then(function () {
            res.status(200).json({message: 'success'});
        }).catch(function (error) {
            res.status(400).json({message: error});
        });

        // 즐찾 키 - 태그 키 추가
        for(i = 0; i < tags.length; i++){
            FavoriteTag.build({
                favoriteKey: favorite.favoriteKey,
                tagKey: tagKeys[i]
            }).save(function () {
                // 즐찾 키 - 태그 키
            }).catch(function (error) {
                // 오류
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
                    favoriteKey : favoriteList[i].favoriteKey,
                    tags : findTagsOfKey(favoriteList[i].favoriteKey)
                };
                favorites.push(temp);
            }

            res.status(200).json({
                favorites: favorites
            });

        });
    });

    router.put('/', function (req, res, next) {
        var favoriteKey = req.body.favoriteKey;
        var userID = req.body.userID;
        var userKey = findUserKey(userID);
        var new_name = req.body.new_name;

        Favorite.update(
            {
                name: new_name
            },
            {
                where: {
                    favoriteKey: favoriteKey,
                    userKey : userKey
                },
                limit: 1
            }
        ).then(function () {
            res.status(200).json({message: 'success'});
        }).catch(function (error) {
            res.status(400).json({message: error});
        });
    });

    router.delete('/', function(req, res, next) {
        var favoriteKey = req.body.favoriteKey;
        var userID = req.body.userID;
        var userKey = findUserKey(userID);

        Favorite.findOne({
            where: {
                userKey: userKey,
                favoriteKey: favoriteKey
            }
        }).then(function (favorite) {
            if (favorite != null){
                favorite.destroy().then(function () {
                    res.status(200).json({message: 'success'});
                }).catch(function (error) {
                    res.status(400).json({message: error});
                });
            }
            else{
                res.status(400).json({message: 'favorite not found which have name of '+favoriteName});
            }
        });
    });

})();

module.exports = router;