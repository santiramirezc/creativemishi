const mongoose = require('mongoose')

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const User = new mongoose.Schema({
    username: String,
    name: String,
    role: String,
    password: String,
    authStrategy: {
        type: String,
        default: "local",
    },
    refreshToken: {
        type: [Session],
    },
})

User.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
})

//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
})

module.exports = mongoose.model('User', User)