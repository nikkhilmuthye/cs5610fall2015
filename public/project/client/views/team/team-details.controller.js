(function(){
    'use strict';

    var controller = angular
        .module("SportsNewsApp")
        .controller("TeamController", ['$scope', '$location', '$rootScope', "$http",'StoryService'
            ,'UserService', 'GlobalService', TeamController]);

    function TeamController($scope, $location, $rootScope, $http, StoryService, UserService, GlobalService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.sortName = true;
        $scope.sortJersery = true;
        $scope.sortPosition = true;

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

        $scope.$watch('reverseSort', function (value) {
            if (value) {
                $scope.arrowSrc = 'http://upload.wikimedia.org/wikipedia/commons/3/30/Gtk-go-down.svg';
            } else {
                $scope.arrowSrc = 'http://upload.wikimedia.org/wikipedia/commons/8/88/Gtk-go-up.svg';
            }
        });

        $scope.notInFavorite = true;

        $scope.init = function(){
            $scope.error = null;
            $scope.success = null;

            if(GlobalService.isSelected && !$scope.team)
            {
                $scope.teamUrl = GlobalService.getSelectedTeam();
                console.log($scope.teamUrl);
                $http({
                    headers: { 'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634' },
                    url: $scope.teamUrl,
                    dataType: 'json',
                    type: 'GET'
                }).success(function(response) {
                    $scope.team = response;
                    $rootScope.team = response;
                    $rootScope.$broadcast('team', response);
                });
                //$scope.league = GlobalService.getSelectedLeague();
            }

            if($scope.team) {
                console.log($scope.team)
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

                if($scope.user)
                {
                    var found = false;
                    var index1 = null;
                    UserService.getAllFavorite($scope.user._id)
                        .then(function (favorites) {
                            console.log(favorites);
                            console.log($scope.team);
                            var url = "";

                            if($scope.team._links.self)
                                url = $scope.team._links.self.href;
                            else
                                url = $scope.team._links.team.href;

                            console.log(url);

                            favorites.forEach(function(fav, index){
                                if (fav && fav==url)
                                {
                                    found = true;
                                    index1 = index;
                                }
                            })

                            if(found)
                            {
                                $scope.notInFavorite = false;
                            }
                            else
                            {
                                $scope.notInFavorite = true;
                            }
                        })
                        .catch(function(err){
                            if(err)
                                $scope.err = err;
                        });
                }
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
            if(predicate == 'name')
                $scope.sortName = !$scope.sortName;
            else if(predicate == 'jerseyNumber')
                $scope.sortJersery = !$scope.sortJersery;
            else if(predicate == 'position')
                $scope.sortPosition = !$scope.sortPosition;
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
                GlobalService.setSelectedLeague($scope.league._links.self.href);
                console.log(response);
                $scope.teams = response;
            });
        };

        $scope.selectedTeam = function (){
            console.log($scope.team);
            $scope.teamUrl = GlobalService.setSelectedTeam($scope.team._links.self.href);
        };

        $scope.addToFavorites = function(){

            if($scope.user) {
                var url = "";

                if($scope.team._links.self)
                    url = $scope.team._links.self.href;
                else
                    url = $scope.team._links.team.href;

                var teamUrl = {"url": url};
                console.log(teamUrl);
                UserService.addTeam(teamUrl, $scope.user._id)
                    .then(function (user) {
                        console.log(user);
                    })
                    .catch(
                    function (error) {
                        $scope.error = error;
                    });
                $scope.notInFavorite = false;
            }
        }

        $scope.removeFromFavorites = function(){

            if($scope.user) {
                var teamUrl = {"url": $scope.team._links.self.href}
                UserService.removeTeam(teamUrl, $scope.user._id)
                    .then(function (user) {
                        console.log(user);
                    })
                    .catch(
                    function (error) {
                        $scope.error = error;
                    });
                $scope.notInFavorite = true;
            }
        }

    };
})();

