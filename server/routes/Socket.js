var Sockets = require('../Socket');

function Socket(server, app, game) {
  var io = require('socket.io').listen(server);

  io.sockets.on('connection', function(socket) {
    console.log("Got new connection from: " + socket.id);
    Sockets.list[socket.id] = socket;
    game.players.add(socket.id);
    // if game is ready, send players initial state of game
    game.initialize(Sockets.list);

    // when receiving a flag from a player that they are ready, flag them
    // in game
    socket.on('ready', function() {
      game.players.ready(socket.id);
    });

    socket.on('disconnect', function() {
      delete Sockets.list[socket.id];
      game.players.remove(socket.id);
      game.end(Sockets.list);
    });
  });

  /**
  * Draw a card
  * @param pid {String} The id of the player drawing a card
  * @returns {Object} containing the card drawn and the player's id
  * @emits data to update the opponent the player's hand has updated
  */
  app.get('/api/field/draw/:pid', function(req, res) {
    let pid = req.params.pid;
    res.send({
      card: game.draw(pid),
      player: pid
    });
    game.emitData(Sockets.list, {opponent: true}, pid);
  });

  /**
  * Discard a card
  * @param pid {String} The id of the player discarding a card
  * @param cid {String} The id of the card to be discarded
  * @returns {Object} containing the discarding player's id, the card discarded,
                      their updated cp and what zone the card is moving to
  * @emits data to update the opponent the player's hand has updated and
           that the field has been updated
  */
  app.get('/api/field/discard/:pid/:cid', function(req, res) {
    let pid = req.params.pid,
        cid = req.params.cid,
        data = game.discard(pid, cid);

    res.send({
      player: pid,
      card: data.card,
      cp: data.cp,
      to: "break"
    });

    game.emitData(Sockets.list, {opponent: true, field: true}, pid);
  });

  /**
  * Play a card
  * @param pid {String} The id of the player playing a card
  * @param cid {String} The id of the card to be played
  * @returns {Object} containing the card being played, what zone it is being
                      played to, the id of the player playing the card and their
                      updated cp
  * @emits data to update the opponent the player's hand has updated and that
           the field has been updated
  */
  app.get('/api/field/play/:pid/:cid', function(req, res) {
    let pid = req.params.pid,
        cid = req.params.cid,
        move = game.playCard(pid, cid);

    res.send({
      card: move.card,
      to: move.card.type,
      player: pid,
      cp: move.cp
    });

    game.emitData(Sockets.list, {opponent: true, field: true}, pid);
  });

  /**
  * Dull a card on the field
  * @param pid {String} The id of the player dulling a card
  * @param cid {String} The id of the card to be dulled
  * @returns {Object} containing the dulled card and the id of the player
                      who dulled it
  * @emits data to update the field
  */
  app.get('/api/field/dull/:pid/:cid', function(req, res) {
    let pid = req.params.pid,
        cid = req.params.cid,
        card = game.dullCard(pid, cid);

    res.send({
      card: card,
      player: pid
    });

    game.emitData(Sockets.list, {field: true}, pid);
  });
}

module.exports = Socket;
