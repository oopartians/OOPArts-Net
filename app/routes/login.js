var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({message: 'unauthorized'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.status(200).json({message: 'success'});
        });
    })(req, res, next);
});

// router.get('/login', function (req, res, next) {
//     res.status(200).json({message: 'login success!'});
// });

router.get('/logout', function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).json({message: 'logout success!'});
    }
    else
        res.status(400).json({message: 'fail'});
});

module.exports.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.status(401).json({message: 'unauthorized'});
};
module.exports = router;