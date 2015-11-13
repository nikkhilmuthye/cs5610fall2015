module.exports = function(app, mongoose, db) {

    var usermodel = require("./models/user.model.js")(mongoose, db);
    var formmodel = require("./models/form.model.js")(mongoose, db);

    require("./services/user.service.server.js")(app, usermodel);
    require("./services/form.service.server.js")(app, formmodel);
    require("./services/field.service.server.js")(app, formmodel);
};