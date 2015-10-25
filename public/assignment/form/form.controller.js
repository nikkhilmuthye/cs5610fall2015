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

		var userForms = [];
		
		$(document).on("pagecreate",function(){
			FormService.findAllFormsForUser($scope.user.id, 
						function(error, forms)
						{
							if(error)
								$scope.error = error;
							else
							{
								userForms = forms;
							}  
						});
		});

		$scope.addForm = function(){
			$scope.error = null;
			//console.log(formName);
			console.log($scope.formName);
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
								userForms = forms;
							}
						});
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
									userForms.push(formadded);
									console.log(userForms);
								}
							});
						
				}
				else
					$scope.error = "Please login to add any forms.";
			}
			else
				$scope.error = "Please enter a valid form name";

		};
	}

})();