(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("ReportedController", ['$scope', '$location', '$rootScope', 'UserService', 'StoryService', ReportedController]);

    function ReportedController($scope, $location, $rootScope, UserService, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.isAdmin = false;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.reportedStories = [];
        $scope.updateSelected = false;

        $scope.init = function () {
            if($scope.user)
            {
                StoryService.findAllReportedStories()
                    .then(
                    function(stories)
                    {
                        console.log(stories);
                        if(stories){
                            stories.forEach(function(story){
                                StoryService.findStoryForUserById(story.storyId)
                                    .then(function(story1){
                                        if(story1)
                                            $scope.reportedStories.push(story1);
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

                $scope.user.role.forEach(function(role){
                    if(role == "admin"){
                        $scope.isAdmin = true;
                    }
                });
            }
        };
        $scope.init();

        $scope.selectStory = function(index){
            var story = $scope.reportedStories[index];
            if(story) {
                $rootScope.story = story;
                $rootScope.$broadcast('story', story);
                $location.path("/story");
            }
        }

        $scope.approveStory =  function (index){
            $scope.error = null;
            $scope.success = null;
            StoryService.approveStoryById($scope.reportedStories[index]._id)
                .then(
                function(stories)
                {
                    console.log(stories);
                    $scope.reportedStories = stories;


                    $scope.success = "Succesfully updated user profile"
                    console.log("Succesfully updated user profile");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        }

        $scope.updateStory = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.findStoryForUserById($scope.reportedStories[index]._id)
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
            StoryService.deleteStoryById($scope.reportedStories[index]._id)
                .then(
                function(stories)
                {
                    console.log(stories);
                    $scope.reportedStories = stories;


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