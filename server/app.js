'use strict';

var express = require('express');
var http = require('http');
var Socket = require('./routes/Socket');
var app = express();
var server = http.createServer(app);
var Game = require('./components/game/Game');

app.set('port', 3535);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in $s mode', app.get('port'), app.get('env'))
});

var game = Game();
var socket = Socket(server, app, game);

module.exports = app;
