const redis = require('redis');

const getClient = () => redis.createClient({
        host: 'https://ebayrak-instantchat.herokuapp.com',
        port: 6379
});

module.exports.getClient = getClient;