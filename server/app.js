'use strict';

var express = require('express');
var http = require('http');
var socket = require('./routes/socket.js');
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

var io = require('socket.io').listen(server);
var SOCKET_LIST = {};

var game = Game();

io.sockets.on('connection', function(socket) {
  console.log("Got new connection from: " + socket.id);
  SOCKET_LIST[socket.id] = socket;
  game.addPlayer(socket.id);
  // if game is ready, send players initial state of game
  game.initialize(SOCKET_LIST);

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    game.removePlayer(socket.id);
    game.end(SOCKET_LIST);
  })
});

app.get('/api/field/draw/:id', function(req, res) {
  let player = req.params.id;
  res.send({
    card: game.draw(player),
    player: player
  });
});

module.exports = app;