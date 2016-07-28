var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local');
var models = require('./models');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
// READ : https://github.com/passport/express-4.x-local-example/blob/master/server.js
passport.use(new Strategy(
    function (username, password, done) {
        models.User.findOne({
            where: {
                userId: username
            }
        }).then(function (user, err) {
            if (err) { return done(err); }
            if (!user) {
                console.log('Incorrect userId');
                return done(null, false, { message: 'Incorrect userId.' });
            }
            else if (password != user.password) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect password.' });
            }
            else {
                console.log('login success!');
                done(null, user);
            }
        });
    }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, callback) {
    callback(null, user.userId);
});

passport.deserializeUser(function (userId, callback) {
    models.User.findOne({
        where: {
            userId: userId
        }
    }).then(function (err, user) {
        if (err) { return callback(err); }
        if (!user) { return callback(null, false); }
        callback(null, user);
    });
});

var routes = require('./routes/index');
var users = require('./routes/user');
var postings = require('./routes/posting');
var favorites = require('./routes/favorites');
var tags = require('./routes/tag');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// git study example
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', login);
app.use('/user', users);
app.use('/posting', postings);
app.use('/favorite', favorites);
app.use('/tag', tags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});


module.exports = app;
