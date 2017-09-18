var sio = require('socket.io');
"+8325209346"

var io = {};

exports.io = function () {
    console.log('io', io)
  return io;
};

exports.initialize = function(server) {
    io = sio(server);
}; 