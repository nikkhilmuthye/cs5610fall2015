(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("LeagueController", ['$scope', '$location', '$rootScope', "$http",'StoryService', LeagueController]);

    function LeagueController($scope, $location, $rootScope, $http, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });
        $rootScope.$on("league", function(event, league){
            $scope.league = $rootScope.league = league;
        });

        $scope.init = function(){
            $scope.error = null;
            $scope.success = null;

            console.log($scope.league._links);
            $http({
                headers: { 'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634' },
                url: $scope.league._links.fixtures.href,
                dataType: 'json',
                type: 'GET'
            }).success(function(response) {
                console.log(response);
                $scope.fixtures = response;
            });
            $http({
                headers: { 'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634' },
                url: $scope.league._links.teams.href,
                dataType: 'json',
                type: 'GET'
            }).success(function(response) {
                console.log(response);
                $scope.teams = response;
            });
            $http({
                headers: { 'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634' },
                url: $scope.league._links.leagueTable.href,
                dataType: 'json',
                type: 'GET'
            }).success(function(response) {
                console.log(response);
                $scope.leagueTable = response;
            });
        };
        $scope.init();

    };

})();