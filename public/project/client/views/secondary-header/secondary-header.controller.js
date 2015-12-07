(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("SecondaryHeaderController", ['$scope', '$location', '$rootScope',
            '$http', 'GlobalService', SecondaryHeaderController]);
	
	
	function SecondaryHeaderController($scope, $location, $rootScope, $http, GlobalService){
		
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
                $scope.leagues = response;
                $rootScope.leagues = response;
                $rootScope.$broadcast('leagues', response);
            });
		};
		$scope.init();

        $scope.selectLeague=function($index){
            console.log($index);
            console.log($scope.leagues[$index]);

            var league = $scope.leagues[$index];
            $rootScope.league = league;

            GlobalService.setSelectedLeague(null);
            GlobalService.setSelectedLeague(league._links.self.href);
            $rootScope.$broadcast('league', league);
            $location.path("/league");
        };

        $scope.selectTeam=function($index){
            console.log($index);
            if($index != 0) {
                var teamurl = "http://api.football-data.org/v1/teams/" + $index;
                GlobalService.setSelectedTeam(teamurl);
                $http({
                    headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                    url: teamurl,
                    dataType: 'json',
                    type: 'GET'
                }).success(function (response) {
                    console.log(response);
                    $scope.team = response;

                    $rootScope.team = response;
                    $rootScope.$broadcast('team', response);
                    $location.path("/team");
                });
            }
            else{
                $scope.team = null;
                $rootScope.team = null;
                $rootScope.$broadcast('team', null);
                $location.path("/team");
            }
        };

	};
})();