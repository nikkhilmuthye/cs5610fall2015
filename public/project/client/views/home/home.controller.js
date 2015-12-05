(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("HomeController", ['$scope', '$location', '$rootScope',
            'UserService', 'StoryService', HomeController]);

    function HomeController($scope, $location, $rootScope, UserService, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.stories = [];

        $scope.init = function () {
            StoryService.findAll()
                .then(
                function(stories)
                {

                    $scope.stories = stories;
                    console.log(stories);
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };
        $scope.init();

        $scope.selectStory = function(index){
            var story = $scope.stories[index];
            if(story) {
                $rootScope.story = story;
                $rootScope.$broadcast('story', story);
                $location.path("/story");
            }
        }
    };

})();