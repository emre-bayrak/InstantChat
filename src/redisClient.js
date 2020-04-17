const redis = require('redis');

const getClient = () => redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

module.exports.getClient = getClient;