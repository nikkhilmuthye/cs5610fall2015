(function(){
    'use strict';

    angular
    .module("SportsNewsApp")
    .controller("ProfileController", ['$scope', '$location', '$rootScope', 'UserService', 'StoryService', ProfileController]);
    
    function ProfileController($scope, $location, $rootScope, UserService, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.userStories = [];
        
         $scope.init = function () {
            if($scope.user)
            {
                StoryService.findAllStoryForUser($scope.user.id, 
                            function(error, stories)
                            {
                                if(error)
                                    $scope.error = error;
                                else
                                {
                                    $scope.userStories = stories;
                                    console.log(stories);
                                }  
                            });
            }
        };
        $scope.init();

        $scope.update = function(){
            $scope.error = null;
            $scope.success = null;
            console.log($scope.user);
            UserService.updateUser($scope.user.id, $scope.user)
                .then(
                function(updatedUser)
                {
                    $scope.user = updatedUser;
                    $scope.success = "Succesfully updated user profile"
                    console.log("Succesfully updated user profile");
                })
                .catch(function(error){
                    $scope.error = error;
                });
        };
    };

})();