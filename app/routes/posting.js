var express = require('express');
var router = express.Router();
var models = require('../models');

/* callback functions */
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

function findOrCreateTagKeys(tagName, callback) {
    var tagkeys = {};
    for (var i = 0; i < tagName.length; i++) {
        models.Tag.findOrCreate({
            where: {
                name: String(tagName[i]),
                role: 'child'
            }
        }).then(function () {
            
        })
    }
    
    callback(tagkeys);
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


/* CREATE Posting */
router.post('/', function (req, res, next) {
    // TODO: link posting with tags
    var posting = models.Posting.build({
        title: req.body.title,
        content: req.body.content
    });

    findOrCreateTagKeys(req.body.tags, function (tagkeys) {
        if (tagkeys.length > 0) {
            for (var i = 0; i < tagkeys.length; i++) {
                models.PostingTag.build({
                    postingKey: posting.postingKey,
                    tagKey: tagKeys[i]
                }).save();
            }
        }
    });

    posting.save().then(function () {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

/* READ Posting one */
router.get('/:postingKey', function(req, res, next) {
    models.Posting.findOne({
        where: {
            postingKey: String(req.params.postingKey)
        }}).then(function (posting) {
        if (posting != null) {
            res.status(200).json({
                postingKey: posting.postingKey,
                title     : posting.title,
                createdAt : posting.createdAt,
                content   : posting.content,
                view      : posting.view,
                star      : posting.star,
                userKey   : posting.userKey
            });
            models.PostingTag.findOne({ where: {
                postingKey: String(req.params.postingKey) } })
        }
        else
            res.status(404).json({
                message: 'not found'
            });
    });
});

/* READ Posting search */
router.get('/', function(req, res, next) {
    var uKey = findUserKey(req.body.userId, function (userKey) {
        res.status(404).json({
            message: 'user not found who have ID of'+userID
        });
        return;
    });

    var tags = req.body.tags;
    var tagkeys = {};
    for (i = 0; i < tags.length; i++) {
        findTagKey(tags[i], function (key) {
            if (key == null) {
                res.status(404).json({
                    message: 'tag not found which have name of'+tags[i]
                });
                return;
            }
            else
                tagkeys[i] = key;
        });
    }

    var keywords = req.body.keyword.split(' ');
    for (var i = 0; i < keywords.length; i++)
        keywords[i] = '%' + keywords[i] + '%';

    models.Posting.findAll({
        where: [{userKey: uKey},
                {$or: [{title: { $like: keywords }},
                    {content: { $like: keywords }}] }]
    }).then(function (posting) {
        if (posting != null)
            res.status(200).json({
                postingKey: posting.postingKey,
                title     : posting.title,
                createdAt : posting.createdAt,
                content   : posting.content,
                view      : posting.view,
                star      : posting.star,
                userKey   : posting.userKey
            });
        else
            res.status(404).json({
                message: 'Not found'
            });
    });
});

/* UPDATE Posting */
router.put('/:postingKey', function(req, res, next) {
    /* TODO: check request data validation
     and, check if query is valid update param key field */
    models.Posting.update(
        req.body,
        {
            where: {
                postingKey: req.params.postingKey
            },
            limit: 1
        }
    ).then(function () {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

/* DELETE Posting */
router.delete('/:postingKey', function(req, res, next) {
    /* TODO: Destroy linked table (if needed) */
    models.Posting.destroy({
        where: {
        postingKey: INTEGER(req.params.postingKey)
    }}).then(function (posting) {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

module.exports = router;