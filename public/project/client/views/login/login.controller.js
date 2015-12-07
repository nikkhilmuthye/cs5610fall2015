(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("LoginController",  ['$scope', '$location', '$rootScope', 'UserService', 'GlobalService',
			LoginController]);

	function LoginController($scope, $location, $rootScope, UserService, GlobalService)
	{
		$scope.$location = $location;
		$scope.error = null;
		$scope.login = function(){

			UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
				.then(
				function(user)
				{
					if(user)
					{
						GlobalService.setUser(user._id);
						console.log(user);
						$rootScope.user = user;
						$rootScope.$broadcast('loggedin', user);
						$location.path( "/profile" );
					}
				})
				.catch(
				function(error)
				{
					console.log(error);
					$scope.error = error;
				}
			);
		};
	};
})();