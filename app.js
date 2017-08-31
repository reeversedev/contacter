var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

// Connecting to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database ' + config.database);
})

var app = express();

var route = require('./routes/index');
var usersRoute = require('./routes/users');

var port = 3000;

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// app.use('/', route);
app.use('/users', usersRoute);

app.listen(port, function() {
    console.log('Server started at port ' + port);
})