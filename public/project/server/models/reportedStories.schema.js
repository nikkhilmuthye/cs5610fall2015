var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
    "storyId": { type: objectId, required: true, unique: true }
}, {collection: 'cs5610.project.reportedstory'});