const redis = require('redis');

const getClient = () => redis.createClient({
    host: 'redis-15572.c12.us-east-1-4.ec2.cloud.redislabs.com',
    port: 15572,
    auth_pass: 'x8n9ombgHqNQZAvcG0L9lvBpWiQw42nn'
}, {no_ready_check: true});

module.exports.getClient = getClient;