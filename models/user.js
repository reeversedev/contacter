var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');

// User Schema

var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByUsername = function (username, callback) {
    var query = {
        username: username
    }
    User.findOne(query, callback);
}
module.exports.addUser = function (newUser, callback) {
    User.find({
        username: newUser.username,
    }).exec(function (err, docs) {
        if (docs.length) {
            callback('User name already exists', null);
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser.save(callback);
                })
            })
        }
    })

}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    })
}