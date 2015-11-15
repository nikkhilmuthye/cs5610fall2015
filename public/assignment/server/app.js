module.exports = function(app, mongoose, db) {

    var usermodel = require("./models/user.model.js")(app, mongoose, db);
    var formmodel = require("./models/form.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, usermodel);
    require("./services/form.service.js")(app, formmodel);
    require("./services/field.service.js")(app, formmodel);
};
