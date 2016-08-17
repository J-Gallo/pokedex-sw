"use strict";

var path 			= require('path');
var util 			= require('util');
var rootPath        = path.normalize(__dirname + '/..');
var env             = process.env.APP_ENV || 'dev';

if(!env) new Error("NODE_ENV variable should be set");

var config    = require(__dirname + util.format('/%s.config.js', env) )(rootPath);

config.env = env;
module.exports = config;
