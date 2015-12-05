(function(){
    'use strict';

    angular
    .module("SportsNewsApp")
    .controller("CreateStoryController", ['$scope', '$location', '$upload',
            '$rootScope', 'StoryService', CreateStoryController]);
    
    function CreateStoryController($scope, $location, $upload, $rootScope, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.uploadFile = function(){

            $scope.fileSelected = function(files) {
                if (files && files.length) {
                    $scope.file = files[0];
                }

                $upload.upload({
                    url: "/api/photo",
                    file: $scope.file
                })
                    .success(function(data) {
                        console.log(data, 'uploaded');
                    });

            };
        };

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