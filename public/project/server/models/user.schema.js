var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    "username": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "firstName": { type: String },
    "lastName": { type: String },
    "email": { type: String, required: true },
    "role": [{ type: String }],
    "favoriteteams" : [{ type: String }],
    "favoritestories" : [{ type: String }]
}, {collection: 'cs5610.project.user'});