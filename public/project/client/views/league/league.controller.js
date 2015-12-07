(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("LeagueController", ['$scope', '$location', '$rootScope', "$http",'StoryService', LeagueController]);

    function LeagueController($scope, $location, $rootScope, $http, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.matchdays = [];
        var unique = {};

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });
        $rootScope.$on("league", function(event, league){
            $scope.league = $rootScope.league = league;
        });

        $scope.$watch('league', function() {
            $scope.init();
        });

        $scope.init = function(){
            $scope.error = null;
            $scope.success = null;

            console.log($scope.league);
            if($scope.league) {
                if(!$scope.leagueTable) {
                    $http({
                        headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                        url: $scope.league._links.leagueTable.href,
                        dataType: 'json',
                        type: 'GET'
                    }).success(function (response) {
                        console.log(response);
                        $scope.leagueTable = response;
                        $scope.matchday = $scope.leagueTable.matchday;
                    });
                }
                if(!$scope.fixtures) {
                    $http({
                        headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                        url: $scope.league._links.fixtures.href,
                        dataType: 'json',
                        type: 'GET'
                    }).success(function (response) {
                        console.log(response);
                        $scope.fixtures = response;
                        $scope.fixtures.fixtures.forEach(function (fixture) {
                            if (typeof(unique[fixture.matchday]) == "undefined") {
                                $scope.matchdays.push(fixture.matchday);
                            }
                            unique[fixture.matchday] = 0;
                        })
                        console.log($scope.matchdays);
                    });
                }
                if(!$scope.teams) {
                    $http({
                        headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                        url: $scope.league._links.teams.href,
                        dataType: 'json',
                        type: 'GET'
                    }).success(function (response) {
                        console.log(response);
                        $scope.teams = response;
                    });
                }
            }
        };
        $scope.init();

        $scope.selectTeam = function (index){
            console.log($scope.leagueTable.standing[index]);
            var team = $scope.leagueTable.standing[index];
            $rootScope.team = team;
            $rootScope.$broadcast('team', team);
            $location.path("/team");
        }

    };

})();