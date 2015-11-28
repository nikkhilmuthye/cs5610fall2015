var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

console.log('db', db);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./public/assignment/server/app.js')(app, mongoose, db);
require('./public/project/server/app.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
