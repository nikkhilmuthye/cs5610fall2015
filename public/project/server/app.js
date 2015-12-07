module.exports = function(app, mongoose, db, passport, LocalStrategy) {

    var usermodel = require("./models/user.model.js")(app, mongoose, db);
    var storymodel = require("./models/story.model.js")(app, mongoose, db);
    var transfermodel = require("./models/transfer.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, usermodel, passport, LocalStrategy);
    require("./services/story.service.js")(app, storymodel);
    require("./services/transfer.service.js")(app, transfermodel);
};
