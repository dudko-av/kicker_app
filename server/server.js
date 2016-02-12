var mongoose = require('./config/mongoose');
var express = require('express');
var session = require('express-session');
var passport = require('passport');

var db = mongoose();
var app = express();

app.use(express.static('client'));
//app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3333);
console.log('Server running at localhost:3333');

module.exports = app;
