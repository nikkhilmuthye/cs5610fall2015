(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("SecondaryHeaderController", ['$scope', '$location', '$rootScope', '$http',SecondaryHeaderController]);
	
	
	function SecondaryHeaderController($scope, $location, $rootScope, $http){
		
		$scope.user = $rootScope.user;
		$scope.$location = $location;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});

		$scope.init = function(){
			$scope.error = null;
			$scope.success = null;
            $scope.leagues = null;

            $http({
                headers: { 'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634' },
                url: 'http://api.football-data.org/v1/soccerseasons/',
                dataType: 'json',
                type: 'GET'
            }).success(function(response) {
                console.log(response);
                $scope.leagues = response;
            });
		};
		$scope.init();

        $scope.selectLeague=function($index){
            console.log($index);
            console.log($scope.leagues[$index]);

            var league = $scope.leagues[$index];
            $rootScope.league = league;
            $rootScope.$broadcast('league', league);
            $location.path("/league");
        };
	};
})();