(function(){
    'use strict';

    angular
    .module("SportsNewsApp")
    .controller("CreateStoryController", ['$scope', '$location',
            '$rootScope', 'StoryService', CreateStoryController]);
    
    function CreateStoryController($scope, $location, $rootScope, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.create = function(Header, story){
            $scope.error = null;
            $scope.success = null;

            if (Header && story)
            {
                var newStory = {
                    heading: Header,
                    contents: story
                }
                StoryService.createStoryForUser($scope.user.id, newStory, 
                function(error, updatedUser)
                {
                    console.log(updatedUser);
                    if (error)
                    {
                        $scope.error = error;
                    } 
                    else 
                    {
                        $scope.user = updatedUser;
                        $scope.success = "Succesfully added new story"
                        console.log("Succesfully updated user profile");
                        $location.path( "/profile" );
                    }
                });
            }
        };
    };

})();