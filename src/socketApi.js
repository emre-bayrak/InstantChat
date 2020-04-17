const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = { 
    io 
};

// libs
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');
const Messages = require('./lib/Messages');

// Socket Authorization
io.use(socketAuthorization);
/*
// Redis Adapter
const redisAdapter = require('socket.io-redis');
const redis = require('redis');
const url = "redis://h:p9c9e4fcb9a8c520125233b7635b18dd57d1ce66cbd1fc53885e400525627aaed@ec2-52-1-83-234.compute-1.amazonaws.com:19209/";
const rtg   = require("url").parse(url);

const pub = redis.createClient(rtg.port, rtg.hostname, {return_buffers: true});
const sub = redis.createClient(rtg.port, rtg.hostname, {return_buffers: true});
pub.auth(rtg.auth.split(":")[1]);
sub.auth(rtg.auth.split(":")[1]);

const redisOptions = {
    pubClient: pub,
    subClient: sub,
    host: rtg.hostname,
    port: rtg.port
  };

io.adapter(redisAdapter(redisOptions));
*/
io.on('connection', socket => {
    console.log('A user logged in with name ' + socket.request.user.firstName);

    Rooms.list(rooms => {
        io.emit('roomList', rooms);
    });

    Users.upsert(socket.id, socket.request.user);

    Users.list(users => {
        io.emit('onlineList', users);
    });

    socket.on('newMessage', data => {
        const messageData = {
            ...data,
            userId: socket.request.user._id,
            firstName: socket.request.user.firstName,
            lastName: socket.request.user.lastName
        };
        Messages.upsert(messageData);
        socket.broadcast.emit('receiveMessage', messageData);
    });

    socket.on('newRoom', roomName => {
        Rooms.upsert(roomName);
        Rooms.list(rooms => {
            io.emit('roomList', rooms);
        });
    });

    socket.on('disconnect', () => {
        Users.remove(socket.request.user._id);

        Users.list(users => {
            io.emit('onlineList', users);
        });
    });
});

module.exports = socketApi;