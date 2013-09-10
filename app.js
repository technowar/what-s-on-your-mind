
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

/**
 * Routes
 */

var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var home = require('./routes/home');
var del = require('./routes/del');
var profile = require('./routes/profile');
var password = require('./routes/password');
var logout = require('./routes/logout');
var wildcard = require('./routes/wildcard');

/**
 * Database
 */

mongoose.connect('mongodb://localhost/trainingProject');

var db = require('./model/db').init();
var User = db.User;

mongoose.connection.on('error', function (err) {
	if (err) { return console.log('No connection to database'); }
});

/**
 * Passport
 */

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * App
 */

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'trainingProject'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Index page
app.get('/', index.page);

// Signup User
app.post('/signup', signup.user);

// Login User
app.post('/login', login.page);

// Homepage
app.get('/home', home.page);
app.post('/home', home.diary);

// Delete
app.get('/del/:diaryId', del.diary);

// Profile
app.get('/profile', profile.page);
app.post('/profile', profile.save);

// Password
app.get('/password', password.page);
app.post('/password', password.save);

// Logout User
app.get('/logout', logout.user);

// Force to redirect page to index
app.get('/:wildcard', wildcard.redirect);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
