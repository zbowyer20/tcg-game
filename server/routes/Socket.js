var Sockets = require('../Socket');

function Socket(server, app, game) {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function(socket) {
    console.log("Got new connection from: " + socket.id);
    Sockets[socket.id] = socket;
    game.addPlayer(socket.id);
    // if game is ready, send players initial state of game
    game.initialize(Sockets);

    socket.on('ready', function() {
      game.readyPlayer(socket.id);
    });

    socket.on('disconnect', function() {
      delete Sockets[socket.id];
      game.removePlayer(socket.id);
      game.end(Sockets);
    });
  });

  app.get('/api/field/draw/:id', function(req, res) {
    let playerId = req.params.id;
    res.send({
      card: game.draw(playerId),
      player: playerId
    });
    game.emitData(Sockets, {opponent: true}, playerId);
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

    game.emitData(Sockets, {opponent: true, field: true}, playerId);
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

    game.emitData(Sockets, {opponent: true, field: true}, playerId);
  });

  app.get('/api/field/dull/:playerId/:cardId', function(req, res) {
    let playerId = req.params.playerId,
        cardId = req.params.cardId,
        card = game.dullCard(playerId, cardId);

    res.send({
      card: card,
      player: playerId
    });

    game.emitData(Sockets, {field: true}, playerId);
  });
}

module.exports = Socket;
