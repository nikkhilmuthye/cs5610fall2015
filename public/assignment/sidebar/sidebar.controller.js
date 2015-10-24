(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("SidebarController", ['$scope', '$location', SidebarController]);
	
	//HeaderController function
	function SidebarController($scope, $location){
		$scope.$location = $location;
	};
})();