const redis = require('redis');
const session = require('express-session');

const redisStore = require('connect-redis')(session);
let redisClient = redis.createClient('redis://h:p9c9e4fcb9a8c520125233b7635b18dd57d1ce66cbd1fc53885e400525627aaed@ec2-52-1-83-234.compute-1.amazonaws.com:19209');

module.exports = new redisStore({
    client: redisClient
});