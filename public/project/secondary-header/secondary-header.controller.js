(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("SecondaryHeaderController", ['$scope', '$location', '$rootScope', SecondaryHeaderController]);
	
	
	function SecondaryHeaderController($scope, $location, $rootScope){
		
		$scope.user = $rootScope.user;
		$scope.$location = $location;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});
		
	};
})();