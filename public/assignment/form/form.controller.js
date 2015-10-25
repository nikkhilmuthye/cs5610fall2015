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
			FormService.findAllFormsForUser($scope.user.id, 
						function(error, forms)
						{
							if(error)
								$scope.error = error;
							else
							{
								$scope.userForms = forms;
							}  
						});
		};
		$scope.init();

		$scope.addForm = function(){
			$scope.error = null;
			var formExists = false;

			if($scope.formName)
			{
				if($scope.user)
				{
					FormService.findAllFormsForUser($scope.user.id, 
						function(error, forms)
						{
							
							if(error)
							{
								$scope.error = error;
							}
							else
							{
								console.log("I am here 1");
								$scope.userForms = forms;
							}
						});

					$scope.userForms.forEach(
						function(form)
						{
							if(form.name === $scope.formName)
								formExists = true
						});
					if(formExists)
						$scope.error = "Form exists. Please enter a unique form name.";
					else
					{
						var newForm = { name : $scope.formName };
						console.log(newForm);
						FormService.createFormForUser($scope.user.id, newForm,
							function(error, formadded)
							{
									if (error)
									{
										$scope.error = error;
									} 
									else 
									{
										$scope.userForms.push(formadded);
										console.log($scope.userForms);
									}
								});
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
				FormService.deleteFormById($scope.userForms[index].id, 
					function(error, result)
					{
						if (error)
						{
							$scope.error = error;
						} 
						else 
						{
							if(result)
							{
								$scope.userForms.forEach(
									function(form, index)
									{
						 				if (form && form.id === $scope.userForms[index].id)
						 				{
						 					$scope.userForms.splice(index, 1);
						 				}
						 			});
							}
						}
				});
			}
			else
				$scope.error = "Please enter valid index number of the form";
		};

		$scope.selectForm = function()
		{
			$scope.error = null;
			var selectedForm;
			if ($scope.formName)
			{
				$scope.userForms.forEach(
					function(form, index)
					{
						if (form.name === $scope.formName)
						{
							selectedForm = form;
							alert("Form Selected : " + JSON.stringify(selectedForm));
						}
					});

				if (!selectedForm)
				{
					$scope.error = "No form with name as  " + $scope.formName + "exists";
				}
			} 
			else 
			{
				$scope.error = "Please provide the name of the form";	
			}			
		};

		$scope.updateForm = function(index)
		{
			$scope.error = null;
			if (typeof index !== "undefined")
			{
				var selectedForm = $scope.userForms[index];
				alert(selectedForm.name + " caanot be updated at this point of time. Please come back to this in the next assignment");
			} 
			else 
			{
				$scope.error = "Please provide a valid form index.";
			}
		};
	}

})();