module.exports = function(app, model) {
    app.post("/api/assignment/form/:formId/field", CreateField);
    app.post("/api/assignment/form/:formId/field/:index", CloneField);
    app.get("/api/assignment/form/:formId/field", FindAllFieldsByForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", FindByIdAndForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", Update);
    app.delete("/api/assignment/form/:formId/field/:fieldId", Delete);

    function CloneField(req, res)
    {
        var formId = req.params.formId;
        var index = req.params.index;
        var field = req.body;

        model
            .CloneField(formId, field, index)
            .then(
            function(field){
                res.json(field);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }

    function CreateField(req, res)
    {
        var formId = req.params.formId;
        var field = req.body;
        model
            .CreateField(formId, field)
            .then(
            function(field){
                res.json(field);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }

    function FindAllFieldsByForm(req, res)
    {
        var formId = req.params.formId;

        model
            .FindById(formId)
            .then(
            function (form) {
                res.json(form.fields);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );

    }

    function FindByIdAndForm(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

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
        var fieldId = req.params.fieldId;
        var field = req.body;

        model
            .Update(formId, form)
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

    function Delete(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        model
            .DeleteField(formId, fieldId)
            .then(
            function(fields){
                res.json(fields);
            })
            .catch(
            function(error){
                res.status(400).send(JSON.stringify(error));
            }
        );
    }


};