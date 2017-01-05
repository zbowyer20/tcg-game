var Player = require('./components/player/Player');

var Sockets = {
  list: {},

  send: {

    /**
    * Send the initial state of the game
    * @param game {Game}
    * @emits {Object} containing the game to all players
    */
    initial: function(game) {
      for (var i = 0; i < game.players.ids.list.length; i++) {
        let pid = game.players.ids.list[i];
        let data = Object.assign({}, game, {
          settings: Player.buildPack(pid)
        });
        Sockets.list[pid].emit('init', {
          game: data
        });
      }
    },

    /**
    * Send public details of a player to their opponent and all their details
    * to themself
    * @param game {Game} The full game
    * @emits {Object} containing the player's public data to their opponent
    * @emits {Object} containing the player's full data to themself
    */
    player: function(game) {
      let pids = game.players.ids.list;
      for (var i = 0; i < pids.length; i++) {
        Sockets.send.message(pids[i], game, {
          opponent: true,
          to: pids
        });
        Sockets.send.message(pids[i], game, {
          self: true,
          to: pids
        });
      }
    },

    /**
    * Send phase information to all players
    * @param data {Object} containing the phase data and who to send it to
    * @emits {Object} containing the phase information
    */
    phase: function(data) {
      Sockets.send.data(null, {
        phase: data.phase
      }, {
        to: data.to
      });
    },

    /**
    * Get the relevant data to send to a player based on given options and
    * send it
    * @param pid {String} The id of the player the data references
    * @param game {Game} The full data of the game
    * @param options {Object} configuration on what object to send
    */
    message: function(pid, game, options) {
      // get the relevant data based on configuration options
      function getData(pid, game, options) {
        let data = {};
        if (options.field) { // sending the field data
          data.field = game.field.getPack(data.players.list);
        }
        if (options.opponent) { // sending public data of the player
          data.opponent = game.players.list[pid].getPublicPack();
        }
        if (options.self) { // sending all data of the player
          data.self = game.players.list[pid].getPack();
        }
        return data;
      }

      let data = getData(pid, game, options);
      Sockets.send.data(pid, data, options)
    },

    /**
    * Check if a piece of data should be sent to a receiver
    * @param rid {String} The id of the possible receiver
    * @param pid {String} The id of the player the data references
    * @param options {Object}
    */
    shouldSend: function(rid, pid, options) {
      let isSelf = rid == pid;
      let shouldSendToSelf = typeof(options.self) != 'undefined';
      return isSelf == shouldSendToSelf;
    },

    /**
    * Emit data.
    * @param pid {String} The id of the player the data references
    * @param data {Object} The data to be emitted
    * @param options {Object}
    */
    data: function(pid, data, options) {
      for (var i = 0; i < options.to.length; i++) {
        let rid = options.to[i];
        if (Sockets.send.shouldSend(rid, pid, options)) {
          Sockets.list[rid].emit('gameUpdate', data);
        }
      }
    }
  }
}

module.exports = Sockets;
