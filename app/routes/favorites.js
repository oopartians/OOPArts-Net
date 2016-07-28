var express = require('express');
var models = require('../models');
var router = express.Router();


function findTagKey(tagName, callback) {
    models.Tag.findOne({
        where: {
            name: String(tagName)
        }
    }).then(function (tag) {
        if (tag != null)
            callback(tag.tagKey);
        else
            callback(null);
    });
}

function findUserKey(userID, callback) {
    models.User.findOne({
        where: {
            userId: String(userID)
        }
    }).then(function (user) {
        if (user != null)
            callback(user.userKey);
        else
            callback(null);
    });
}

function findTagName(tagKey, callback) {
    models.Tag.findOne({
        where: {
            tagKey: String(tagKey)
        }
    }).then(function (tag) {
        if (tag != null)
            callback(tag.name);
        else
            callback(null);
    });
}

function findFavoriteKey(userKey, favoriteName, callback) {
    models.Favorite.findOne({
        where: {
            userKey: String(userKey),
            name : String(favoriteName)
        }
    }).then(function (favorite) {
        if (favorite != null)
            callback(favorite.favoriteKey);
        else
            callback(null);
    });
}

function findTagsOfKey(favoriteKey, callback){
    var i = 0;
    var tags = [];
    var num;
    models.FavoriteTag.findAll({
        where:{
            favoriteKey : favoriteKey
        }
    }).then(function (favoriteTagList) {
        if(favoriteTagList != null){
            for(i = 0; i < favoriteTagList.length; i++){
                num = 0;
                findTagName(favoriteTagList[i].tagKey, function (temp) {
                    if(temp == null)
                        return;
                    tags.push(temp);
                    num++;
                    if(num == favoriteTagList.length - 1){
                        callback(tags);
                    }
                });
            }
        }else{
            callback(null);
        }
    });
}

router.post('/', function (req, res, next) {
    var favoriteName = req.body.name;   // 즐찾 이름
    var tags = req.body.tags;           // [ 태그명 ]
    var userID = req.body.userId;       // 유저 아이디
    var i;

    findUserKey(userID, function (userKey) {
        if(userKey == null){
            res.status(404).json({
                message: 'user not found who have ID of'+userID
            });
            return;
        }

        var tagKeys = {};
        for(i = 0; i < tags.length; i++){
            (function(index){
                findTagKey(tags[i],function (value) {
                    tagKeys[index] = value;
                    if(tagKeys[index] == null){
                        res.status(404).json({
                            message: 'tag not found which have name of'+tags[i]
                        });
                        return;
                    }
                });
            })(i);
        }

        // 즐찾 테이블 추가
        models.Favorite.build({
            userKey : userKey,
            name : favoriteName
        }).save().then(function () {
            res.status(200).json({message: 'success'});
        }).catch(function (error) {
            res.status(400).json({message: error});
        });

        // 즐찾 키 - 태그 키 추가
        for(i = 0; i < tags.length; i++){
            models.FavoriteTag.build({
                favoriteKey: favorite.favoriteKey,
                tagKey: tagKeys[i]
            }).save(function () {
                // 즐찾 키 - 태그 키
            }).catch(function (error) {
                // 오류
            });
        }
    });
});

/* READ User one */
router.get('/', function (req, res, next) {
    var userID = req.body.userId;
    var i = 0;
    var favorites = [];
    var temp;
    findUserKey(userID, function (userKey) {
        models.Favorite.findAll({
            where:{
                userKey: userKey
            }
        }).then(function (favoriteList) {

            for(i = 0; i < favoriteList.length; i++){
                (function (index) {
                    findTagsOfKey(favoriteList[index], function (value) {
                        temp = {
                            name : favoriteList[index].name,
                            favoriteKey : favoriteList[index].favoriteKey,
                            tags : value
                        };
                        favorites.push(temp);
                    });
                })(i);
            }

            res.status(200).json({
                favorites: favorites
            });

        });
    });
});

router.put('/', function (req, res, next) {
    var favoriteKey = req.body.favoriteKey;
    var userID = req.body.userID;
    var new_name = req.body.new_name;
    findUserKey(userID, function (userKey) {
        models.Favorite.update(
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
});

router.delete('/', function(req, res, next) {
    var favoriteKey = req.body.favoriteKey;
    var userID = req.body.userID;
    findUserKey(userID, function (userKey) {
        models.Favorite.findOne({
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
});

module.exports = router;