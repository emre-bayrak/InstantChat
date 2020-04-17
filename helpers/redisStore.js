const redis = require('redis');
const session = require('express-session');

const redisStore = require('connect-redis')(session);
let redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = new redisStore({
    client: redisClient
});