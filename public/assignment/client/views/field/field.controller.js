(function() {

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldController", ['$scope', '$location', '$rootScope', '$routeParams', 'FieldService', FieldController]);

    function FieldController($scope, $location, $rootScope, $routeParams, FieldService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.fields = [];

        $scope.formID = $routeParams.formId || "";
        $scope.userID = $routeParams.userId || "";

        $rootScope.$on("loggedin", function (event, user) {
            $scope.user = $rootScope.user = user;
        });

        $rootScope.$on("selectedForm", function (event, selectedForm) {
            console.log($scope.selectedForm);
            $scope.selectedForm = $rootScope.selectedForm = selectedForm;
        });

        $scope.init = function () {
            FieldService.getFieldsForForm($scope.selectedForm.id)
                .then(
                function(fields)
                {
                    console.log(fields);
                    $scope.fields = fields;

                })
                .catch(
                function(error){
                    console.log(error);
                    $scope.error = error;
                }
            );
        };
        $scope.init();

        var TEXT = { "id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field" };
        var EMAIL = { "id": null, "label": "New Email Field", "type": "EMAIL", "placeholder": "New Field" };
        var TEXTAREA = { "id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field" };
        var DATE = { "id": null, "label": "New Date Field", "type": "DATE" };
        var OPTIONS = { "id": null, "label": "New Dropdown", "type": "OPTIONS",
                "options":
                    [{"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            ;
        var CHECKBOXES = { "id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
            "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};
        var RADIOS = { "id": null, "label": "New Radio Buttons", "type": "RADIOS",
            "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

        var newField = {
            "TEXT": cloneField(TEXT),
            "TEXTAREA": cloneField(TEXTAREA),
            "DATE": cloneField(DATE),
            "OPTIONS": cloneField(OPTIONS),
            "CHECKBOXES": cloneField(CHECKBOXES),
            "RADIOS": cloneField(RADIOS),
            "EMAIL": cloneField(EMAIL)
        };

        function cloneField(source){
            if (source)
            {
                return JSON.parse(JSON.stringify(source));
            }
            else
            {
                return null;
            }
        }

        $scope.addField = function(FieldType){
            $scope.error = "";

            if (FieldType)
            {

                var newFieldObject = cloneField(newField[FieldType]);
                FieldService.createFieldForForm($scope.selectedForm.id,newFieldObject)
                    .then(
                    function(result){
                        $scope.fields.push(result);
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );
            }
            else
            {
                $scope.error = "Please select a field type to add";
            }
        };

        $scope.deletefield = function(index){
            $scope.error = null;

            if(typeof index !== "undefined")
            {
                FieldService.deleteFieldFromForm($scope.selectedForm.id, $scope.fields[index].id)
                    .then(
                    function(result)
                    {
                        $scope.fields = result;
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );
            }
            else
                $scope.error = "Please enter valid index number of the form";
        };


        $scope.cloneSameField = function(index){
            $scope.error = null;

            if(typeof index !== "undefined")
            {
                var newFieldObject = cloneField(newField[$scope.fields[index].type]);
                FieldService.cloneFieldFromForm($scope.selectedForm.id, newFieldObject, index)
                    .then(
                    function(result)
                    {
                        $scope.fields.splice(index+1, 0,result);
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );
            }
            else
                $scope.error = "Please enter valid index number of the form";
        };
    }
})();