const redis = require('redis');

const getClient = () => redis.createClient(15572,'redis-15572.c12.us-east-1-4.ec2.cloud.redislabs.com', {no_ready_check: true});

module.exports.getClient = getClient;