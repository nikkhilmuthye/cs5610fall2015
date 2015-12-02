var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    "contents": { type: String, required: true },
    "likes": { type: Number, default: 0 },
    "dislikes": { type: Number, default: 0 },
    "userId": { type: String }
}, {collection: 'cs5610.project.transfers'});