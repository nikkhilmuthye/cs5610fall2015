(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("PersonalController", ['$scope', '$location', '$rootScope', 'UserService', 'StoryService', PersonalController]);

    function PersonalController($scope, $location, $rootScope, UserService, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.isAdmin = false;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.userStories = [];
        $scope.updateSelected = false;

        $scope.init = function () {
            if($scope.user)
            {
                StoryService.findAllStoryForUser($scope.user._id)
                    .then(
                    function(stories)
                    {

                        $scope.userStories = stories;
                        console.log(stories);
                    })
                    .catch(
                    function(error){
                        $scope.error = error;
                    }
                );

                $scope.user.role.forEach(function(role){
                    if(role == "admin"){
                        $scope.isAdmin = true;
                    }
                });
            }
        };
        $scope.init();

        $scope.selectStory = function(index){
            var story = $scope.userStories[index];
            if(story) {
                $rootScope.story = story;
                $rootScope.$broadcast('story', story);
                $location.path("/story");
            }
        }

        $scope.selectUpdate = function(){
            $scope.updateSelected = true;
        }

        $scope.cancel = function(){
            $scope.updateSelected = false;
        }

        $scope.update = function(){
            $scope.error = null;
            $scope.success = null;
            console.log($scope.user);
            if($scope.user.password == $scope.verifypassword) {
                UserService.updateUser($scope.user._id, $scope.user)
                    .then(
                    function (updatedUser) {
                        console.log(updatedUser);
                        $scope.user = updatedUser;
                        $scope.success = "Succesfully updated user profile"
                        console.log("Succesfully updated user profile");
                        $scope.updateSelected = false;
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });
            }
            else
            {
                $scope.error = "Cannot verify password";
            }
        }

        $scope.updateStory = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.findStoryForUserById($scope.userStories[index]._id)
                .then(
                function(story)
                {
                    if(story)
                    {
                        console.log(story);
                        $rootScope.story = story;
                        $rootScope.$broadcast('selectedstory', story);
                        $location.path( "/createstory" );
                    }
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };

        $scope.deleteStory = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.deleteStoryById($scope.userStories[index]._id)
                .then(
                function(stories)
                {
                    console.log(stories);
                    $scope.userStories = stories;


                    $scope.success = "Succesfully updated user profile"
                    console.log("Succesfully updated user profile");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };
    };

})();