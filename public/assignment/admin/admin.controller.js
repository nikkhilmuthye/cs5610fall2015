(function(){

	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("AdminController", ['$scope', '$location', '$rootScope', 'FormService', AdminController]);

	function AdminController($scope, $location, $rootScope, FormService ){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});
	}
})();