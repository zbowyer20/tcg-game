'use strict';

var express = require('express');
var http = require('http');

var socket = require('./routes/socket.js');

var app = express();
var server = http.createServer(app);

app.set('views', __dirname + 'src');
app.use(express.static(__dirname + '/public'));
app.set('port', 3535);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  socket.emit('init', {socket: socket.id});
  console.log("Got new connection from: " + socket.id);
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in $s mode', app.get('port'), app.get('env'))
});

module.exports = app;
