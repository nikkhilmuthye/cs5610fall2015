var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

var OptionsSchema = mongoose.Schema({
    "label" : String,
    "value" : String
});

module.exports = mongoose.Schema({
    "id": String,
    "label" : String,
    "type" : String,
    "placeholder" : String,
    "options" : [OptionsSchema]
});
