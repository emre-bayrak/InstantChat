const redis = require('redis');

const getClient = () => redis.createClient({
        url: 'redis://h:pb3f73d0f54eff7a4533a360a9fdf7edfe663debcb66c245c3fd21c8f7d10b392@ec2-52-21-150-124.compute-1.amazonaws.com:27379'
});

module.exports.getClient = getClient;