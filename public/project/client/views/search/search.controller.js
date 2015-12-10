(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("SearchController", ['$scope', '$location', '$rootScope', '$http','UserService',
            'StoryService', 'GlobalService', SearchController]);


    function SearchController($scope, $location, $rootScope, $http, UserService, StoryService, GlobalService){

        $scope.user = $rootScope.user;
        $scope.$location = $location;
        $scope.searchtext = "";
        $scope.teams = [];


        $rootScope.$on("loggedin", function(event, user)
        {
            $scope.user = $rootScope.user = user;
        });

        $rootScope.$on("leagues", function(event, leagues)
        {
            $scope.leagues = $rootScope.leagues = leagues;
        });

        $rootScope.$on("searchtext", function(event, searchtext)
        {
            $scope.searchtext = $rootScope.searchtext = searchtext;
        });


        $scope.change = function(){
            GlobalService.setSearchtext($scope.searchtext);
            console.log($scope.searchtext);
        }

        $scope.getTeams = function(){
            $scope.teams = [];
            $scope.leagues.forEach(function (league) {
                if (league.caption != "Champions League 2015/16") {
                    $http({
                        headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                        url: league._links.teams.href,
                        dataType: 'json',
                        type: 'GET'
                    }).success(function (response) {
                        $scope.teams = $scope.teams.concat(response.teams);
                    });
                }
            })
        }

        $scope.init = function () {

            StoryService.findAll()
                .then(
                function(stories)
                {
                    $scope.stories = stories;
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
            UserService.findAllUsers()
                .then(
                function(users)
                {
                    console.log(users);
                    $scope.users = users;
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
            if($scope.leagues) {
                $scope.getTeams();
            }

            $scope.searchtext = GlobalService.getSearchText();
        };
        $scope.init();

        $scope.selectLeague = function(league){
            console.log(league);

            var league = league;
            $rootScope.league = league;
            $rootScope.$broadcast('league', league);
            $location.path("/league");
        }

        $scope.selectTeam = function(team){
            var teamurl = team._links.self.href;
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

        };

        $scope.selectStory = function(story){
            if(story) {
                $rootScope.story = story;
                $rootScope.$broadcast('story', story);
                $location.path("/story");
            }
        }

        $scope.selectProfile = function(user){
            if(user){
                console.log(user);
                $rootScope.selectedUser = user;
                $rootScope.$broadcast('selectedUser', user);
                $location.path("/publicprofile");
            }
        }

    };
})();