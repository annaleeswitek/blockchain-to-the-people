import io from 'socket.io-client';
import store from './store';
import { newVoteSocket }  from './store/candidate';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('newVote', function (data) {
    store.dispatch(newVoteSocket(data));
    console.log('triggered in socket! Here is data: ', data);
  });

});


export default socket;
