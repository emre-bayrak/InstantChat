const redis = require('redis');

const getClient = () => redis.createClient('redis://redistogo:1bd4db556cca817279bc9cf138fe2f9a@tarpon.redistogo.com:11708/');

module.exports.getClient = getClient;