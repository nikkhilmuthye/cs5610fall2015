var bodyParser = require('body-parser');
var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload 			= 		multer({ dest: './uploads/'});

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
app.use(multer({ dest: './uploads/',
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

require('./public/assignment/server/app.js')(app, mongoose, db);
require('./public/project/server/app.js')(app, mongoose, db);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.post('/api/photo',function(req,res){
    console.log(upload);
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(port, ipaddress, function(){
    console.log("Working on port 3000");
});
