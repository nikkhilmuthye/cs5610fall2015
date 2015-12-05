var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    "heading": { type: String, required: true, unique: true },
    "contents": { type: String, required: true },
    "userId": { type: String, required: true },
    "comments": [{ type: String }],
    "date": { type: Date, default: Date.now }
}, {collection: 'cs5610.project.story'});