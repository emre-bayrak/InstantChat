const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = { 
    io 
};

// libs
const Users = require('./lib/Users');

// Socket Authorization
io.use(socketAuthorization);

// Redis Adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ 
    host: process.env.REDIS_URI, 
    port: process.env.REDIS_PORT 
}));

io.on('connection', socket => {
    console.log('A user logged in with name ' + socket.request.user.firstName);

    Users.upsert(socket.id, socket.request.user);

    Users.list(users => {
        io.emit('onlineList', users);
    });

    socket.on('disconnect', () => {
        Users.remove(socket.request.user.googleId);

        Users.list(users => {
            io.emit('onlineList', users);
        });
    });
});

module.exports = socketApi;