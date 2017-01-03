var Player = require('./components/player/Player');

var Sockets = {
  list: {},

  send: {
    initial: function(game) {
      for (var pid in game.players.list) {
        let data = Object.assign({}, game, {
          settings: Player.buildPack(pid)
        });
        Sockets.list[pid].emit('init', {
          game: data
        });
      }
    },

    player: function(game) {
      let players = game.players.list;
      for (var pid in players) {
        Sockets.send.message(pid, game, {
          opponent: true,
          to: players
        });
        Sockets.send.message(pid, game, {
          self: true,
          to: players
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

    shouldSend: function(to, pid, options) {
      let isSelf = to == pid;
      let shouldSendToSelf = typeof(options.self) != 'undefined';
      return isSelf == shouldSendToSelf;
    },

    data: function(pid, data, options) {
      for (var id in options.to) {
        if (Sockets.send.shouldSend(id, pid, options)) {
          Sockets.list[id].emit('gameUpdate', data);
        }
      }
    }
  }
}

module.exports = Sockets;
