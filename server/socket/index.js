

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on('newVote', (data) => {
      socket.broadcast.emit('newVote', data);
      console.log('newVote socket has been triggered! And here is data: ', data);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    });
  });

};
