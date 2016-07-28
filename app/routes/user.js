var express = require('express');
var router = express.Router();
var models = require('../models');

/* CREATE User */
router.post('/', function (req, res, next) {
    // TODO: check request data validation
    var user = models.User.build({
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

/* READ User all or search */
router.get('/', function(req, res, next) {
    /* TODO: check request data validation
     and, check if query is valid search param key field */
    models.User.findAll({
        where: req.query,
        attributes: ['userId', 'name', 'image', 'exp', 'grade', 'status']
    }).then(function (users) {
        if (users != null)
            res.status(200).json({Users: users});
        else
            res.status(400).json({message: 'error'});
    });
});

/* READ User one */
router.get('/:userId', function(req, res, next) {
    models.User.findOne({
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
            res.status(404).json({message: 'not found'});
    });
});

/* UPDATE User */
router.put('/:userId', function(req, res, next) {
    /* TODO: check request data validation
    and, check if query is valid update param key field */
    models.User.update(
        req.body,
        {
            where: {
                userId: req.params.userId
            },
            limit: 1
        }
    ).then(function () {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

/* DELETE User */
router.delete('/:userId', function(req, res, next) {
    /* TODO: check request data validation */
    models.User.update(
        {
            status: 'dropped'
        },
        {
            where: {
                userId: req.params.userId
            },
            limit: 1
        }
    ).then(function () {
        res.status(200).json({message: 'success'});
    }).catch(function (error) {
        res.status(400).json({message: error});
    });
});

module.exports = router;
