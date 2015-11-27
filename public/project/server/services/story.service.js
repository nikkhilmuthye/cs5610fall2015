module.exports = function(app, model) {
    app.post("/api/project/user", Create);
    app.get("/api/project/user", FindUsers);
    app.get("/api/project/user/:id", FindById);
    app.put("/api/project/user/:id", Update);
    app.delete("/api/project/user/:id", Delete);

};