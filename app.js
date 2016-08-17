//require('newrelic');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var uuid = require('uuid');
var compression = require('compression');
var async = require("async");
var fs = require('fs');
var config = require('./config/config');
var device = require('get-user-agent');

var app = express();
var hbs = require('hbs');
var appv = fs.readFileSync('APP_VERSION').toString().trim();

var fullDay = 86400000;

app.use(parallel([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  compression(),
  cookie,
  baseUrl
]));

app.set('x-powered-by', false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Partials
hbs.registerPartials(__dirname + '/views');
hbs.registerPartials(__dirname + '/views/modules');

app.use('/statics', express.static(path.join(__dirname, 'statics'), {maxAge: fullDay}));
app.use('/src', express.static(path.join(__dirname, 'src'), {maxAge: fullDay}));
app.use('/', express.static(path.join(__dirname, ''), {maxAge: fullDay}));

app.use('/', routes);
app.get('/health', function(req, res) {
  res.json({status: "ok"});
});

// error handlers
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  if(err.status != 500) return next(err);
});


//Functions

function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}

function cookie(req, res, next) {
  var cookie = req.cookies['epi.context'];
  if (cookie === undefined) {
    res.cookie('epi.context', '"{\\"userId\\":\\"'+ uuid.v4() +'\\"\}"', {encode: String });
  }
  next();
}

function baseUrl(req, res, next) {
  //Get user agent
  var currentDevice = device.detectDevice(req.get('User-Agent'));
  (currentDevice !== "desktop") ? res.locals.device = currentDevice : res.locals.device = '';

  res.locals.appVersion = appv;
  //res.locals.cloudFrontUrl = config.cloudfront.url;
  next();
}

module.exports = app;
