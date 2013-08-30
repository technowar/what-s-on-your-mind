
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

/**
 * Routes
 */

var index = require('./routes/index');
var wildcard = require('./routes/wildcard');
var signup = require('./routes/signup');

/**
 * Database
 */

var mongoose = require('mongoose');
var db = require('./model/db');
var User = db.signup(mongoose);

mongoose.connect("mongodb://localhost/trainingProject");

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
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Force to redirect page to index
app.get('/:wildcard', wildcard.redirect);

// Index page
app.get('/', index.page);

// Signup
app.post('/', signup.user);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
