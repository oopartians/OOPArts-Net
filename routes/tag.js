var express = require('express');
var router = express.Router();
var Tag = require('../models/TagModel');

/* CREATE Tag*/
router.post('/', function (req, res, next) {
    // TODO: check request data validation
    var tag = Tag.build({
        name: req.body.name
    });
    tag.save().then(function () {
        res.status(200).json({
            message: 'success'
        });
    }).catch(function (error) {
        res.status(400).json({
            message: 'error'
        });
    });
});

/* Update Tag Name*/
router.put('/', function(req, res, next) {

});

/* Delete Tag */
router.delete('/', function (req, res, next) {

});

/* Search All Tag */
router.get('/', function(req, res, next) {{
    Tag.findAll({
        attribute: ['name']
    }).then(function (tag) {
        if(tag != null)
            res.status(200).json({
                Tags: tag
            });
        else
            res.status(400).json({
                message: 'error'
            })
    });
}})


/* Search One Tag */
router.get('/:name', function (req, res, next) {
    Tag.findOne({
        where: {
            name: String(req.params.name)
        }
    }).then(function (tag) {
        if (tag != null)
            res.status(200).json({
                name: tag.name,
                role: tag.role
            });
        else
            res.status(404).json({
                message: 'Not Found'
            });
    });
});

module.exports = router;
