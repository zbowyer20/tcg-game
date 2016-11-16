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

var SOCKET_LIST = {};

io.sockets.on('connection', function(socket) {
  console.log("Got new connection from: " + socket.id);
  SOCKET_LIST[socket.id] = socket;

  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
  })

  socket.emit('init', {socket: socket.id});
});

module.exports = app;
