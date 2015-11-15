module.exports = function(app, model) {
    app.post("/api/assignment/user/:userId/form", Create);
    app.get("/api/assignment/form/user/:userId", FindAll);
    app.get("/api/assignment/form/:formId", FindById);
    app.put("/api/assignment/form/:formId", Update);
    app.delete("/api/assignment/form/:formId", Delete);


    function Create(req, res)
    {
        var userId = req.params.userId;
        var form = req.body;
        model
            .Create(userId, form)
            .then(
            function(form){
                res.json(form);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }

    function FindAll(req, res)
    {
        var userId = req.params.userId;

        model
            .FindAllForUser(userId)
            .then(
                function (forms) {
                    res.json(forms);
                })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );

    }

    function FindById(req, res)
    {
        var formId = req.params.formId;

        model
            .FindById(formId)
            .then(
            function(form){
                res.json(form);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }

    function Update(req, res)
    {
        var formId = req.params.formId;
        var form = req.body;
        console.log(formId);
        console.log(form);
        model
            .Update(formId, form)
            .then(
            function(forms){
                res.json(forms);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }

    function Delete(req, res)
    {
        var formId = req.params.formId;

        model
            .Delete(formId)
            .then(
            function(form){
                res.json(form);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }
};