var Player = require('./components/player/Player');

var Sockets = {
  list: {},

  send: {
    initial: function(game) {
      for (var i = 0; i < game.players.ids.length; i++) {
        let pid = game.players.ids[i];
        let data = Object.assign({}, game, {
          settings: Player.buildPack(pid)
        });
        Sockets.list[pid].emit('init', {
          game: data
        });
      }
    },

    player: function(game) {
      let pids = game.players.ids;
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

    phase: function(data) {
      Sockets.send.data(null, {
        phase: data.phase
      }, {
        to: data.to
      });
    },

    message: function(pid, game, options) {
      function getData(pid, game, options) {
        let data = {};
        if (options.field) {
          data.field = game.field.getPack(data.players.list);
        }
        if (options.opponent) {
          data.opponent = game.players.list[pid].getPublicPack();
        }
        if (options.self) {
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
