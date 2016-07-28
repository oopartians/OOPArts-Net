var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log('1');
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {return res.status(200).json({message: 'login fail..'});}
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.status(200).json({message: 'login success!'});
        });
    })(req, res, next);
});

router.get('/login', function (req, res, next) {
    res.status(200).json({message: 'login success!'});
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.status(200).json({message: 'logout success!'});
});

module.exports = router;