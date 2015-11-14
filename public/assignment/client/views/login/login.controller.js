(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("LoginController",  ['$scope', '$location', '$rootScope', 'UserService', LoginController]);

	function LoginController($scope, $location, $rootScope, UserService)
	{
		$scope.$location = $location;
		$scope.error = null;
		$scope.login = function(){

			UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
				.then(
				function(user) {
					if (user) {
						console.log(user);
						$rootScope.user = user;
						$rootScope.$broadcast('loggedin', user);
						$location.path("/profile");
					}
				})
				.catch(function(error){
                    console.log(error);
					$scope.error = error;
				});
		};
	};
})();