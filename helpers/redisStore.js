const redis = require('redis');
const session = require('express-session');

const redisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

module.exports = new redisStore({
    client: redisClient
});