var bodyParser = require('body-parser');
var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload = multer({ dest: 'public/project/uploads/' });
var fs = require('fs');
/*var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');*/

var multipart = require('connect-multiparty');
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

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: 'uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));

/*app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});*/

require('./public/assignment/server/app.js')(app, mongoose, db);
require('./public/project/server/app.js')(app, mongoose, db);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var type = upload.single('userPhoto');

app.post('/api/photos/upload', type, function (req,res) {
    var tmp_path = req.file.path;
    var target_path = 'public/project/uploads/' + req.file.originalname;
    var backURL=req.header('Referer') || '/';
    console.log(backURL+"#/createstory");
    console.log(req);

    fs.rename("public/project/uploads/"+req.file.filename, "public/project/uploads/"+req.file.originalname);
    res.status(200).redirect(backURL+"#/createstory");
});

app.listen(port, ipaddress, function(){
    console.log("Working on port 3000");
});
