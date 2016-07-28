var express = require('express');
var router = express.Router();
var Tag = require('../models/TagModel');
var HierarchyTag = require('../models/HierarchyTagModel')

/* CREATE Tag*/
router.post('/', function (req, res, next) {
    // TODO: check request data validation
    var tag = Tag.build({
        name: req.body.name,
        role: req.body.role
    });
    tag.save().then(function () {
        res.status(200).json({ message: 'success' });
    }).catch(function (error) {
        res.status(400).json({ message: 'error' });
    });
});

/* Update Tag Role*/
router.put('/:tagKey', function(req, res, next) {
    Tag.update({ role: req.body.new_role }, {
        where: { tagKey: req.params.tagKey }, limit: 1}
    ).then(function () {
        res.status(200).json({ message: 'success' });
    }).catch(function (error) {
        res.status(400).json({ message: error });
    });
});

/* Delete Tag */
router.delete('/:name', function (req, res, next) {
    Tag.destroy({
        where: { name: req.params.name }
    }).then(function () {
        res.status(200).json({ message: 'success' });
    }).catch(function (error) {
        res.status(400).json({ message: error });
    });
});

/* Search All Tag */
router.get('/', function(req, res, next) {{
    Tag.findAll({
        attribute: ['name']
    }).then(function (tag) {
        if(tag != null)
            res.status(200).json({ Tags: tag });
        else
            res.status(400).json({ message: 'error' });
    });
}})


/* Search One Tag */
router.get('/:name', function (req, res, next) {
    Tag.findOne({
        where: { name: String(req.params.name) }
    }).then(function (tag) {
        if (tag != null)
            res.status(200).json({
                name: tag.name,
                role: tag.role,
                tagKey: tag.tagKey
            });
        else
            res.status(404).json({ message: 'Not Found' });
    });
});

module.exports = router;
