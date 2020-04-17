const redis = require('redis');

const getClient = () => redis.createClient('redis://rediscloud:x8n9ombgHqNQZAvcG0L9lvBpWiQw42nn@redis-15572.c12.us-east-1-4.ec2.cloud.redislabs.com:15572', {no_ready_check: true});

module.exports.getClient = getClient;