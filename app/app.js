var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var models = require('./models');
var sequelize = require('./models/index').sequelize;
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, userId, password, done) {
        models.User.findOne({
            where: {
                userId: userId
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
passport.serializeUser(function (user, callback) {
    callback(null, user);
});

passport.deserializeUser(function (user, callback) {
    callback(null, user);
});

var routes = require('./routes/index');
var users = require('./routes/user');
var postings = require('./routes/posting');
var favorites = require('./routes/favorites');
var tags = require('./routes/tag');
var login = require('./routes/login');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'ooparts.club');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

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
app.use(session({
    secret: config.session_secret,
    saveUninitialized: true,
    resave: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    proxy: true
}));
app.use(allowCrossDomain);

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
