const redis = require('redis');

const getClient = () => redis.createClient({
        host: 'localhost',
        port: 6379
});

module.exports.getClient = getClient;