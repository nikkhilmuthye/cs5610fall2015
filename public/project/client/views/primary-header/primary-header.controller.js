(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("PrimaryHeaderController", ['$scope', '$location', '$rootScope', PrimaryHeaderController]);
	
	
	function PrimaryHeaderController($scope, $location, $rootScope){
		
		$scope.user = $rootScope.user;
		$scope.$location = $location;
        $scope.searchtext = "";

		$scope.logout = function()
		{
			$scope.user = $rootScope.user = null;
            $rootScope.$broadcast('loggedin', $scope.user);
			$location.path( "/home" );
		};

		
		$rootScope.$on("loggedin", function(event, user)
		{
			$scope.user = $rootScope.user = user;
		});

		$scope.change = function(){

            if($scope.searchtext && $scope.searchtext != "") {
                $rootScope.searchtext = $scope.searchtext;
                $rootScope.$broadcast('searchtext', $scope.searchtext);
                $scope.searchtext = "";
                $location.path("/search");
            }
        }
	};
})();