const redis = require('redis');

const getClient = () => redis.createClient(process.env.REDIS_URL);

module.exports.getClient = getClient;