(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("HomeController", ['$scope', '$location', '$rootScope',
            'UserService', 'StoryService', HomeController]);

    function HomeController($scope, $location, $rootScope, UserService, StoryService ){

        $scope.filteredTodos = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 10
            ,$scope.maxSize = 5;
        $scope.top4 = [];

        $scope.makeTodos = function() {
            $scope.todos = [];
            for (var i=1;i<=1000;i++) {
                $scope.todos.push({ text:"todo "+i, done:false});
            }
        };
        $scope.makeTodos();

        $scope.$watch("currentPage + numPerPage", function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredTodos = $scope.todos.slice(begin, end);
        });

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.stories = [];

        $scope.init = function () {
            var unique = {};
            StoryService.findAll()
                .then(
                function(stories)
                {

                    $scope.stories = stories;

                    var top = [];
                    if(stories.length > 4) {
                        while (top.length != 4) {
                            var random = Math.floor((Math.random() * stories.length));
                            console.log(random);

                            if (typeof(unique[random]) == "undefined") {
                                console.log(stories[random]);
                                top.push(stories[random]);
                            }
                            unique[random] = 0;
                        }
                    }
                    else{
                        top = stories;
                    }
                    $scope.top4 = top;

                    $scope.top4.forEach(function(story){
                        if(!story.img){
                            story.img = "../img/championsleague.png"
                        }
                        else{
                            story.img = "../uploads/"+story.img;
                        }
                    });

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