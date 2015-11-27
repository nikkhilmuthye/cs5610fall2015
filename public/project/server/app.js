module.exports = function(app, mongoose, db) {

    var usermodel = require("./models/user.model.js")(app, mongoose, db);
    var storymodel = require("./models/story.model.js")(app, mongoose, db);
    var webapimodel = require("./models/webapi.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, usermodel);
    //require("./services/story.service.js")(app, storymodel);
    require("./services/webapi.service.js")(app, webapimodel);
};
