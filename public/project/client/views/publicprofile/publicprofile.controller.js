(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("PublicProfileController", ['$scope', '$location', '$rootScope', '$http',
            'UserService', 'StoryService', PublicProfileController]);

    function PublicProfileController($scope, $location, $rootScope, $http, UserService, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.follow = true;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $rootScope.$on("selectedUser", function(event, user){
            $scope.selectedUser = $rootScope.selectedUser = user;
        });

        $scope.followingUsers = [];
        $scope.stories = [];
        $scope.teams = [];
        $scope.updateSelected = false;

        $scope.init = function () {
            if($scope.user && $scope.selectedUser)
            {
                UserService.GetAllFollowingUsers($scope.user._id)
                    .then(function(folowingUsers){
                        folowingUsers.forEach(function(user){
                            if(user == $scope.selectedUser._id){
                                $scope.follow = false;
                            }
                        })
                    })
                    .catch(function(err){
                        if(err)
                        {
                            console.log(err);
                            $scope.error = err;
                        }
                    })
                console.log($scope.selectedUser);
                UserService.getAllFavoriteStories($scope.selectedUser._id)
                    .then(
                    function(stories)
                    {
                        console.log(stories);
                        if(stories){
                            stories.forEach(function(story){
                                StoryService.findStoryForUserById(story)
                                    .then(function(story1){
                                        if(story1)
                                            $scope.stories.push(story1);
                                    })
                                    .catch(function(err){
                                        $scope.error = err;
                                    })
                            });
                        }
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );

                UserService.GetAllFollowingUsers($scope.selectedUser._id)
                    .then(
                    function(users)
                    {
                        console.log(users);
                        if(users){
                            users.forEach(function(user){
                                UserService.findStoryForUserById(user)
                                    .then(function(user1){
                                        if(user1)
                                            $scope.followingUsers.push(user1);
                                    })
                                    .catch(function(err){
                                        $scope.error = err;
                                    })
                            });
                        }
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );

                StoryService.findAllStoryForUser($scope.selectedUser._id)
                    .then(function(stories){
                        $scope.personalStories = stories;

                    })
                    .catch(function(err){
                        if(err)
                            $scope.error = err;
                    });

                UserService.getAllFavorite($scope.selectedUser._id)
                    .then(function (favorites) {
                        console.log(favorites);
                        favorites.forEach(function(fav, index){
                            $http({
                                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                                url: fav,
                                dataType: 'json',
                                type: 'GET'
                            }).success(function (response) {
                                console.log(response);
                                $scope.teams.push(response.name);
                            });
                        })
                    })
                    .catch(function(err){
                        if(err)
                            $scope.err = err;
                    });
            }
        };
        $scope.init();

        $scope.addToFavorites = function(){

            if($scope.user && $scope.selectedUser._id) {
                UserService.followUser($scope.selectedUser._id, $scope.user._id)
                    .then(function (user) {
                        console.log(user);
                    })
                    .catch(
                    function (error) {
                        $scope.error = error;
                    });
                $scope.follow = false;
            }
        }

        $scope.removeFromFavorites = function(){

            if($scope.user) {
                UserService.unfollowUser($scope.selectedUser._id, $scope.user._id)
                    .then(function (user) {
                        console.log(user);
                    })
                    .catch(
                    function (error) {
                        $scope.error = error;
                    });
                $scope.follow = true;
            }
        }
    };

})();