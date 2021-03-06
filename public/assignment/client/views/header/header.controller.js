(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("HeaderController", ['$scope', '$location', '$rootScope', HeaderController]);
	
	
	function HeaderController($scope, $location, $rootScope){
		
		$scope.user = $rootScope.user;
		$scope.$location = $location;

		$scope.logout = function()
		{
			$scope.user = $rootScope.user = null;

			$location.path( "/home" );
		};

		
		$rootScope.$on("loggedin", function(event, user)
		{
			$scope.user = $rootScope.user = user;
		});
		
	};
})();