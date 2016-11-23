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
  let playerId = req.params.id;
  res.send({
    card: game.draw(playerId),
    player: playerId
  });
  game.emitData(SOCKET_LIST, {opponent: true}, playerId);
});

app.get('/api/field/discard/:playerId/:cardId', function(req, res) {
  let playerId = req.params.playerId,
      cardId = req.params.cardId,
      data = game.discard(playerId, cardId);

  res.send({
    player: playerId,
    card: data.card,
    cp: data.cp,
    to: "break"
  });

  game.emitData(SOCKET_LIST, {opponent: true, field: true}, playerId);
});

app.get('/api/field/play/:playerId/:cardId', function(req, res) {
  let playerId = req.params.playerId,
      cardId = req.params.cardId,
      move = game.playCard(playerId, cardId);

  res.send({
    card: move.card,
    to: move.card.type,
    player: playerId,
    cp: move.cp
  });

  game.emitData(SOCKET_LIST, {opponent: true, field: true}, playerId);
});

app.get('/api/field/dull/:playerId/:cardId', function(req, res) {
  let playerId = req.params.playerId,
      cardId = req.params.cardId,
      card = game.dullCard(playerId, cardId);

  res.send({
    card: card,
    player: playerId
  });

  game.emitData(SOCKET_LIST, {field: true}, playerId);
});

module.exports = app;
