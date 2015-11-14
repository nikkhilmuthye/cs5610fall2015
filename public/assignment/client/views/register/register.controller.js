(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("RegisterController", ['$scope', '$location', '$rootScope', "$q", 'UserService', RegisterController]);
	
	function RegisterController($scope, $location, $rootScope, $q, UserService )
	{
		$scope.$location = $location;
		console.log("Hello register here");

		$scope.register = function()
		{
            console.log("In here");
			$scope.error = null;
			if ($scope.username && $scope.password && $scope.verifypassword && $scope.email)
			{
				UserService.findAllUsers().then(function(users)
				{
                    if ($scope.password !== $scope.verifypassword)
                    {
                        $scope.error = "both the password fields should match";
                    }
                    else {
                        console.log("In here");
                        var errorMessage = UserService.checkNewUser($scope.username, $scope.email, users)
                        console.log("Came back");
                        if (false)
                            $scope.error = errorMessage;
                        else {
                            var newUser = {
                                username: $scope.username,
                                password: $scope.password,
                                email: $scope.email
                            }
                            console.log(newUser);
                            UserService.createUser(newUser)
                                .then(
                                function (newlyCreatedUser) {
                                    console.log("newly created user is ", newlyCreatedUser);
                                    console.log(newlyCreatedUser)
                                    $rootScope.user = newlyCreatedUser;

                                    $rootScope.$broadcast('loggedin', newlyCreatedUser);

                                    $location.path("/profile");
                                })
                                .catch(function (error) {
                                    $scope.error = error;
                                });
                        }
                    }
				})
                .catch(function(error){
                    $scope.error = error;
                });
			}
		};
	};


})();