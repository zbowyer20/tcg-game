import * as actions from './actions/gameActions';
import io from 'socket.io-client';

export default function (store) {
  const socket = io('http://localhost:3535');

  socket.on('init', function(data) {
    store.dispatch(actions.startGame(data));
  });
}
