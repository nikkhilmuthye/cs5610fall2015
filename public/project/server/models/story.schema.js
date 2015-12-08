var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

var RatingSchema = new mongoose.Schema({
    "totalRating" : { type: Number, default: 0 },
    "totalVotes" : { type: Number, default: 0 },
    "rating" : { type: Number, default: 0}
});

module.exports = new mongoose.Schema({
    "heading": { type: String, required: true, unique: true },
    "contents": { type: String, required: true },
    "userId": { type: String, required: true },
    "comments": [{ type: String }],
    "date": { type: Date, default: Date.now },
    "img": {type : String},
    "rating" : { type : RatingSchema}
}, {collection: 'cs5610.project.story'});