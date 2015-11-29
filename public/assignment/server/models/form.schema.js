var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId,
    FieldSchema = require("./field.schema.js");


module.exports = new mongoose.Schema({
    "id": String,
    "title" : String,
    "userId" : String,
    "fields" : [FieldSchema]
}, {collection: "cs5610.assignment.form"})
