const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb+srv://instantchat_user:abcd1234@cluster0-3kq7k.mongodb.net/instantchat?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.connection.on('open', () => {
    //console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });

  mongoose.Promise = global.Promise;
};