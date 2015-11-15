(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var fieldService = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            updateField: updateField,
            deleteFieldFromForm : deleteFieldFromForm,
            cloneFieldFromForm : cloneFieldFromForm
        };
        return fieldService;

        function cloneFieldFromForm(formId, field, index)
        {
            var deferred = $q.defer();

            $http.post("/api/assignment/form/"+formId+"/field/"+index, field)
                .success(function(fields){
                    deferred.resolve(fields);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function createFieldForForm(formId, field)
        {
            var deferred = $q.defer();

            $http.post("/api/assignment/form/"+formId+"/field",field)
                .success(function(newField){
                    deferred.resolve(newField);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function deleteFieldFromForm(formId, fieldId)
        {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(fields){
                    deferred.resolve(fields);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function getFieldsForForm(formId)
        {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/"+ formId +"/field")
                .success(function(formfields){

                    deferred.resolve(formfields);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function getFieldForForm(formId, fieldId)
        {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/"+formId+"/field"+fieldId)
                .success(function(field){

                    deferred.resolve(field);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };

        function updateField(formId, fieldId, field)
        {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/"+formId+"/field"+fieldId, field)
                .success(function(fieldAfterUpdate){
                    deferred.resolve(fieldAfterUpdate);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        };
    };

})();