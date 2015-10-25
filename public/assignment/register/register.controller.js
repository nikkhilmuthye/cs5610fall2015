(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", ['$scope', '$location', '$rootScope', 'UserService', RegisterController]);
	
	function RegisterController($scope, $location, $rootScope, UserService )
	{
		$scope.$location = $location;
		console.log("Hello register here");

		$scope.register = function()
		{
			$scope.error = null;
			if ($scope.username && $scope.password && $scope.verifypassword && $scope.email)
			{
				UserService.findAllUsers(function(error, users)
				{
					if (error)
					{
						$scope.error = error;
					} 
					else 
					{
						if ($scope.password !== $scope.verifypassword)
						{
							$scope.error = "both the password fields should match";
						} 
						else 
						{
							console.log("In here");
							var errorMessage = UserService.checkNewUser($scope.username, $scope.email)
							console.log("Came back");
							if(errorMessage)
								$scope.error = errorMessage;
							 else 
							 {
								var newUser = {
									username: $scope.username,
									password: $scope.password,
									email: $scope.email
								}
								UserService.createUser(newUser, 
									function(err, newlyCreatedUser)
									{
										console.log("newly created user is ", newlyCreatedUser);

										$rootScope.user = newlyCreatedUser;

										$rootScope.$broadcast('loggedin', newlyCreatedUser);

										$location.path( "/profile" );
									});
							}
						}
					}
				});
			}
		};
	};


})();