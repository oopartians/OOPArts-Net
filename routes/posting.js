var express = require('express');
var router = express.Router();
var Posting = require('../models/PostingModel');
var Tag = require('../models/TagModel');

/* CREATE Posting */
router.post('/', function (req, res, next) {
    // TODO: check request data validation
    var posting = Posting.build({
        title: req.body.title,
        content: req.body.content
        //tag: req.body.tag
    });
    posting.save().then(function () {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

/* READ Posting one */
router.get('/:postingKey', function(req, res, next) {
    Posting.findOne({
        where: {
            postingKey: String(req.params.postingKey)
        }}).then(function (posting) {
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
                message: 'not found'
            });
    });
});

/* READ Posting search */
router.get('/', function(req, res, next) {
    Posting.findAll({
        where: req.query,
        attributes: ['userId', 'name', 'title']//, 'tag']
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
                message: 'not found'
            });
    });
});

/* UPDATE Posting */
router.put('/:postingKey', function(req, res, next) {
    /* TODO: check request data validation
     and, check if query is valid update param key field */
    Posting.update(
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
    /* TODO: check request data validation */
    Posting.findOne(
        where: {
        postingKey: String(req.params.postingKey)
    }).then(function (posting) {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

module.exports = router;