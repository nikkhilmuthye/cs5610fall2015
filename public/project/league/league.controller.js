(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("LeagueController", ['$scope', '$location', '$rootScope', 'StoryService', LeagueController]);

    function LeagueController($scope, $location, $rootScope, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        console.log("League Controller...");

        $scope.init = function(){
            console.log("League Controller...");
            $scope.error = null;
            $scope.success = null;

            $http.get("api.sportradar.us/soccer-t2/eu/teams/standing.xml?api_key=husdyx6m5rngzr4abfpbutsm")
                .success(function(league){
                    console.log(league);
                })
                .error(function(error){
                    if (error){
                        console.log(error);
                    }
                });
        };
        $scope.init();
    };

})();