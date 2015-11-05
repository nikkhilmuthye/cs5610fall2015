(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("LoginController",  ['$scope', '$location', '$rootScope', 'UserService', LoginController]);

	function LoginController($scope, $location, $rootScope, UserService)
	{
		$scope.$location = $location;
		$scope.error = null;
		$scope.login = function(){

			UserService.findUserByUsernameAndPassword($scope.username, $scope.password, 
				function(error, user)
				{
					if(user)
					{
						console.log(user);
						$rootScope.user = user;
						$rootScope.$broadcast('loggedin', user);
						$location.path( "/profile" );
					}
					else
					{
						console.log(error);
						$scope.error = error;
					}
				});
		};
	};

	function callback(error, user)
	{
		$scope.error = null;
		if(error != null)
		{
			$rootScope.user = user;
			$rootScope.$broadcast('loggedin', user);
			$location.path( "/profile" );
		}
		else
		{
			alert(error);
			$scope.error = error;
		}
	}

})();