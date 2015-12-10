(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("FavoritesController", ['$scope', '$location', '$rootScope', 'UserService', '$http',
            'StoryService', FavoritesController]);

    function FavoritesController($scope, $location, $rootScope, UserService, $http, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.isAdmin = false;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.favorites = [];
        $scope.updateSelected = false;
        $scope.favoritesStories = [];
        $scope.favoritesUsers = [];

        $scope.init = function () {
            if($scope.user)
            {
                $scope.favoritesStories = [];
                $scope.favoritesUsers = [];
                $scope.favorites = [];
                UserService.getAllFavorite($scope.user._id)
                    .then(function (favorites) {
                        console.log(favorites);
                        favorites.forEach(function(fav, index){
                            $http({
                                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                                url: fav,
                                dataType: 'json',
                                type: 'GET'
                            }).success(function (response) {
                                $scope.favorites.push(response);
                            });
                        })
                    })
                    .catch(function(err){
                        if(err)
                            $scope.err = err;
                    });

                UserService.GetAllFollowingUsers($scope.user._id)
                    .then(function (favorites) {
                        console.log(favorites);
                        favorites.forEach(function(fav, index){
                            UserService.findUserbyId(fav)
                                .then(function(user){
                                    $scope.favoritesUsers.push(user);
                                })
                        })
                    })
                    .catch(function(err){
                        if(err)
                            $scope.err = err;
                    });

                UserService.getAllFavoriteStories($scope.user._id)
                    .then(function (favorites) {
                        console.log(favorites);
                        favorites.forEach(function(fav, index){
                            StoryService.findStoryForUserById(fav)
                                .then(function(story){
                                    $scope.favoritesStories.push(story);
                                })
                        })
                    })
                    .catch(function(err){
                        if(err)
                            $scope.err = err;
                    });

                $scope.user.role.forEach(function(role){
                    if(role == "admin"){
                        $scope.isAdmin = true;
                    }
                });
            }
        };
        $scope.init();

        $scope.deleteFavorite = function(team){
            $scope.error = null;
            $scope.success = null;

            var teamUrl = {"url": team._links.self.href}
            UserService.removeTeam(teamUrl, $scope.user._id)
                .then(
                function(stories)
                {
                    console.log(stories);

                    $scope.user = stories;
                    $scope.init();
                    $scope.success = "Succesfully updated user profile"
                    console.log("Succesfully updated user profile");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };

        $scope.removeFromFavorites = function(story){
            if($scope.user && story){
                UserService.removeStoryFromFavorites($scope.user._id, story._id)
                    .then(function(response){
                        $scope.init();
                    })
                    .catch(function(err){
                        $scope.error = err;
                    });
            }
        }

        $scope.unfollowUser = function(user) {
            if ($scope.user && user) {
                UserService.removeStoryFromFavorites(user._id, $scope.user._id)
                    .then(function (response) {
                        $scope.init();
                    })
                    .catch(function (err) {
                        $scope.error = err;
                    });
            }
        }

        $scope.selectTeam = function(team){
            if(team){
                $rootScope.team = team;
                $rootScope.$broadcast('team', team);
                $location.path("/team");
            }

        }

        $scope.selectStory = function(story){
            if(story){
                $rootScope.story = story;
                $rootScope.$broadcast('story', story);
                $location.path("/story");
            }
        }

        $scope.selectUser = function(user){
            if(user){
                $rootScope.selectedUser = user;
                $rootScope.$broadcast('selectedUser', user);
                $location.path("/publicprofile");
            }
        }
    };

})();