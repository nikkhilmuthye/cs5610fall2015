var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./public/assignment/server/app.js')(app, mongoose, db);
require('./public/project/server/app.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
