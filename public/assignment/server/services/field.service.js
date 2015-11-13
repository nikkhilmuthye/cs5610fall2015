module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", FindAllByForm);
    app.post("api/assignment/form/:formId/field", CreateField);
    app.get("/api/assignment/form/:formId/field/:fieldId", FindByIdAndForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", Update);
    app.delete("/api/assignment/form/:formId/field/:fieldId", Delete);


};