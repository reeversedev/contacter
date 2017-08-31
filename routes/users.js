var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

// Register
router.post('/signup', function (req, res, next) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, function(err, user) {
        if(err) {
            res.json({
                success: false,
                msg: 'Failed to register user'
            })
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    })
});

module.exports = router;