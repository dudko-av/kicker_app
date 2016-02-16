var mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var express = require('express');
var cors = require('cors');
var session = require('express-session');
var fs = require('fs');

var db = mongoose();
var app = express();
passport = passport();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cors());
app.use(express.static('client'));
//app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// dynamically include routes (Controller)
fs.readdirSync('./server/controllers').forEach(function (file) {
    require('./controllers/' + file).controller(app);
});

io.on('connection', function (socket) {
    console.log(123);
});

server.listen(3333);
console.log('Server running at localhost:3333');

module.exports = app;
