const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    userId: String,
    thumbnail: String,
    date: Number,
    type: String
})

const User = mongoose.model('user', userSchema);

module.exports = User