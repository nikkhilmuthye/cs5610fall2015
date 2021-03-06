(function(){

	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("FormController", ['$scope', '$location', '$rootScope', 'FormService', FormController]);
	
	function FormController($scope, $location, $rootScope, FormService ){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});

		$scope.userForms = [];
		
		 $scope.init = function () {
			FormService.findAllFormsForUser($scope.user._id)
                .then(
                    function(forms)
                    {

                        $scope.userForms = forms;

                    })
                .catch(
                    function(error){
                        $scope.error = error;
                    }
                );
		};
		$scope.init();

		$scope.addForm = function(){
			$scope.error = null;
			var formExists = false;

			if($scope.formName)
			{
				if($scope.user)
				{
					FormService.findAllFormsForUser($scope.user._id)
                        .then(
						function(forms)
						{
								console.log("I am here 1");
								$scope.userForms = forms;
						})
                        .catch(
                        function(error){
                            $scope.error = error;
                        }
                        )

					$scope.userForms.forEach(
						function(form)
						{
							if(form.title === $scope.formName)
								formExists = true
						});
					if(formExists)
						$scope.error = "Form exists. Please enter a unique form name.";
					else
					{
						var newForm = { title : $scope.formName, fields: [] };

						FormService.createFormForUser($scope.user._id, newForm)
							.then(
							function(formadded)
							{
                                $scope.userForms.push(formadded);
                            })
                            .catch(
                            function(error){
                                    $scope.error = error;
                            }
                        )
					}
						
				}
				else
					$scope.error = "Please login to add any forms.";
			}
			else
				$scope.error = "Please enter a valid form name";

		};

		$scope.deleteForm = function(index){
			$scope.error = null;

			if(typeof index !== "undefined")
			{
				console.log($scope.userForms[index]);
				FormService.deleteFormById($scope.userForms[index]._id)
                    .then(
					function(result)
					{
                        $scope.userForms = result;
				    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                )
			}
			else
				$scope.error = "Please enter valid index number of the form";
		};

		$scope.selectForm = function(index)
		{
			$scope.error = null;
			var selectedForm;

			if (index !== null)
			{
                selectedForm = $scope.userForms[index];

                if (!selectedForm)
				{
					$scope.error = "No form with name as  " + $scope.formName + "exists";
				}
                else
                {
                    $scope.selectedForm = selectedForm;
                    $rootScope.selectedForm = selectedForm;

                    $rootScope.$broadcast('selectedForm', selectedForm);

                    console.log(selectedForm);

                    $location.path("/user/"+$scope.user._id+"/form/"+$scope.selectedForm._id+"/fields");
                }
			} 
			else 
			{
				$scope.error = "Please provide the name of the form";	
			}			
		};

		$scope.selectUpdateForm = function(index)
		{
			$scope.error = null;
			if (typeof index !== "undefined")
			{
				var selectedForm = $scope.userForms[index];
                $scope.formName = selectedForm.title;
                $scope.selectedForm = $scope.userForms[index];
                $scope.index = index;
				//alert(selectedForm.title + " cannot be updated at this point of time. Please come back to this in the next assignment");
			} 
			else 
			{
				$scope.error = "Please provide a valid form index.";
			}
		};

        $scope.updateForm = function()
        {
            if (!$scope.selectedForm)
            {
                $scope.error = "No form with name as  " + $scope.formName + "exists";
            }
            else
            {
                console.log($scope.userForms);
                var newForm = { title : $scope.formName };
                FormService.updateFormById($scope.selectedForm._id, newForm)
                    .then(
                    function(result)
                    {
                        /*$scope.userForms = null;
                        $scope.userForms = result;
                        $scope.selectForm = "";
                        $scope.formName = "";*/
                        $scope.init();
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                )
            }
        };
	}

})();