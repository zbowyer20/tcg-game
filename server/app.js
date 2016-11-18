'use strict';

var express = require('express');
var http = require('http');
var socket = require('./routes/socket.js');

var app = express();
var server = http.createServer(app);

app.set('port', 3535);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in $s mode', app.get('port'), app.get('env'))
});

var io = require('socket.io').listen(server);

var FieldSide = function() {
  var self = {
    damage: [],
    forward: [],
    backup: [],
    deck: 50,
    break: [],
  }

  return self;
}

var Field = function() {
  var self = {};

  self.addPlayer = function(id) {
    self[id] = FieldSide();
  }

  return self;
}

var Player = function(id) {
  var self = {
    id: null,
    hand: [],
    cp: {
      amount: 0,
      elements: []
    }
  }

  return self;
}

var PLAYER_LIST = {};

var Game = function() {
  var self = {
    field: Field(),
    players: PLAYER_LIST,
    settings: {
      me: "PLAYER_ONE",
      opponent: "PLAYER_TWO"
    }
  }

  self.addPlayer = function(id) {
    PLAYER_LIST[id] = Player(id);
    self.field.addPlayer(id);
  }

  self.ready = function() {
    return Object.keys(self.players).length == 2;
  }

  return self;
}

var SOCKET_LIST = {};
var game = Game();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/game', function(req, res) {
  res.send(game);
});

io.sockets.on('connection', function(socket) {
  console.log("Got new connection from: " + socket.id);
  SOCKET_LIST[socket.id] = socket;
  game.addPlayer(socket.id);

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  })
  if (game.ready()) {
    for (var id in SOCKET_LIST) {
      let players = {
        me: id,
        opponent: Object.keys(SOCKET_LIST).find((socketId) => {
          return socketId != id
        })
      };
      SOCKET_LIST[id].emit('init', {
        game: Object.assign({}, game, {
          settings: players
        })
      });
    }
  }
});

module.exports = app;
