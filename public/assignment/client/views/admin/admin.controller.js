(function(){

	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("AdminController", ['$scope', '$location', '$rootScope', 'UserService', AdminController]);

	function AdminController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});

		$scope.users = [];

		$scope.init = function () {
			UserService.findAllUsers( )
				.then(
						function(users)
						{
								$scope.users = users;
						})
				.catch(function (error) {
					$scope.error = error;
				});
		};
		$scope.init();
	}
})();