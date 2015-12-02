(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("TeamController", ['$scope', '$location', '$rootScope', "$http",'StoryService', TeamController]);

    function TeamController($scope, $location, $rootScope, $http, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });
        $rootScope.$on("team", function(event, team){
            $scope.team = $rootScope.team = team;
        });

        $scope.$watch('team', function() {
            $scope.init();
        });

        $rootScope.$on("leagues", function(event, leagues){
            $scope.leagues = $rootScope.leagues = leagues;
        });

        $scope.$watch('leagues', function() {
            //$scope.init();
        });

        $rootScope.$on("teams", function(event, teams){
            $scope.teams = $rootScope.teams = teams;
        });

        $scope.$watch('teams', function() {
            //$scope.init();
        });

        $scope.init = function(){
            $scope.error = null;
            $scope.success = null;

            if($scope.team) {
                if($scope.team._links.team) {
                    $http({
                        headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                        url: $scope.team._links.team.href,
                        dataType: 'json',
                        type: 'GET'
                    }).success(function (response) {
                        console.log(response);
                        $scope.teamdetails = response;
                        $scope.getTeamDetails();
                    });
                }
                else {
                    $scope.teamdetails = $scope.team;
                    $scope.getTeamDetails();
                }
            }
            if($scope.league) {
                $scope.selectedLeague();
            }
        };

        $scope.getTeamDetails = function (){
            $http({
                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                url: $scope.teamdetails._links.fixtures.href,
                dataType: 'json',
                type: 'GET'
            }).success(function (response) {
                console.log(response);
                $scope.fixtures = response;

                $scope.FinishedFixtures = []
                $scope.fixtures.fixtures.forEach(function(fixture){
                    if(fixture.status == "FINISHED")
                        $scope.FinishedFixtures.push(fixture);
                });
            });
            $http({
                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                url: $scope.teamdetails._links.players.href,
                dataType: 'json',
                type: 'GET'
            }).success(function (response) {
                console.log(response);
                $scope.players = response;
                $scope.predicate = 'position';
                $scope.reverse = true;

            });
        }
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $scope.selectedLeague = function (){
            console.log($scope.league);

            $http({
                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                url: $scope.league._links.teams.href,
                dataType: 'json',
                type: 'GET'
            }).success(function (response) {
                console.log(response);
                $scope.teams = response;
            });
        };

        $scope.selectedTeam = function (){
            console.log($scope.league);
        };

    };

})();