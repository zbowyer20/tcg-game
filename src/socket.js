import * as actions from './actions/gameActions';
import io from 'socket.io-client';

export default function (store) {
  const socket = io('http://localhost:3535');

  socket.on('init', function(data) {
    store.dispatch(actions.startGame(data));
    socket.emit('ready');
  });

  socket.on('gameUpdate', function(data) {
    if (data.opponent) {
      store.dispatch(actions.updatePlayer(data.opponent));
    }
    if (data.self) {
      store.dispatch(actions.updatePlayer(data.self));
    }
    if (data.field) {
      store.dispatch(actions.updateField(data.field));
    }
  });

  socket.on('endGame', function() {
    store.dispatch(actions.endGame());
  });
}
