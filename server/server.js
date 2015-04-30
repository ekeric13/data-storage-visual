var express = require('express');
var mongoose = require('mongoose');

var app = express();

// Database setup (dev & production)
var pEnv = process.env;
var devDb = 'mongodb://localhost/datastorage-dev';
mongoose.connect(pEnv.MONGOLAB_URI || devDb);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.on('open', function() { console.log('mongo hooked'); });

// Middleware setup
require('./config/middleware.js')(app, express);

module.exports = app;
