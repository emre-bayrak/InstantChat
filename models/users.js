const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    profilePhotoUrl: String 
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('users', userSchema);