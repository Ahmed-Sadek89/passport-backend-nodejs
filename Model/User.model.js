const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    thumbnail: String
})

const User = mongoose.model('user', userSchema);

module.exports = User