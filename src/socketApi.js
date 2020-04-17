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

// Redis Adapter
const redisAdapter = require('socket.io-redis');
const pub = redis.createClient(15572, 'redis-15572.c12.us-east-1-4.ec2.cloud.redislabs.com', { auth_pass: "x8n9ombgHqNQZAvcG0L9lvBpWiQw42nn" });
const sub = redis.createClient(15572, 'redis-15572.c12.us-east-1-4.ec2.cloud.redislabs.com', { auth_pass: "x8n9ombgHqNQZAvcG0L9lvBpWiQw42nn" });
io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));

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