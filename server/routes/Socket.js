var Sockets = require('../Socket');

function Socket(server, app, game) {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function(socket) {
    console.log("Got new connection from: " + socket.id);
    Sockets.list[socket.id] = socket;
    game.players.add(socket.id);
    // if game is ready, send players initial state of game
    game.initialize(Sockets.list);

    socket.on('ready', function() {
      game.players.ready(socket.id);
    });

    socket.on('disconnect', function() {
      delete Sockets.list[socket.id];
      game.players.remove(socket.id);
      game.end(Sockets.list);
    });
  });

  app.get('/api/field/draw/:id', function(req, res) {
    let playerId = req.params.id;
    res.send({
      card: game.draw(playerId),
      player: playerId
    });
    game.emitData(Sockets.list, {opponent: true}, playerId);
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

    game.emitData(Sockets.list, {opponent: true, field: true}, playerId);
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

    game.emitData(Sockets.list, {opponent: true, field: true}, playerId);
  });

  app.get('/api/field/dull/:playerId/:cardId', function(req, res) {
    let playerId = req.params.playerId,
        cardId = req.params.cardId,
        card = game.dullCard(playerId, cardId);

    res.send({
      card: card,
      player: playerId
    });

    game.emitData(Sockets.list, {field: true}, playerId);
  });
}

module.exports = Socket;
