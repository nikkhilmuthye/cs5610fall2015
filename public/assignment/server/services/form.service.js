module.exports = function(app, model) {
    app.post("/api/assignment/user/:userId/form", Create);
    app.get("/api/assignment/user/:userId/formr", FindAll);
    app.get("/api/assignment/form/:formId", FindById);
    app.put("/api/assignment/form/:formId", Update);
    app.delete("/api/assignment/form/:formId", Delete);


    function Create(req, res)
    {
        var userId = req.params["userId"];
        var form = req.params["form"];
        model
            .Create(userId, form)
            .then(
            function(form){
                res.json(form);
            });
    }

    function FindAll(req, res)
    {
        model
            .FindAll()
            .then(
                function (users) {
                    res.json(users);
                });

    }

    function FindById(req, res)
    {
        var formId = req.params["formId"];

        model
            .FindById(formId)
            .then(
            function(form){
                res.json(form);
            });
    }

    function Update(req, res)
    {
        var formId = req.params["formId"];
        var form = req.params["user"];
        model
            .Update(formId, form)
            .then(
            function(form){
                res.json(form);
            });
    }

    function Delete(req, res)
    {
        var formId = req.params["formId"];
        var form = req.params["form"];
        model
            .Delete(formId, form)
            .then(
            function(form){
                res.json(form);
            });
    }
};