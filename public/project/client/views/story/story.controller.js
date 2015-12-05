(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("StoryController",  ['$scope', '$location', '$rootScope', 'UserService', 'StoryService', StoryController]);

	function StoryController($scope, $location, $rootScope, UserService, StoryService)
	{
		$scope.$location = $location;
		$scope.user = $rootScope.user;
        $scope.reported = false;
        $scope.author = "";

		$scope.comments = [];

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

		$rootScope.$on("story", function(event, story){
			$scope.story = $rootScope.story = story;
		});


        $scope.notInFavorite = true;
        $scope.init = function(){
            if($scope.story){
                console.log($scope.story);

                UserService.findUserbyId($scope.story.userId)
                    .then(function(user){
                        $scope.author = user;
                    })
                    .catch(function(err){
                        $scope.error =err;
                    })
            }
        };
        $scope.init();
        $scope.addComment = function(){
        	console.log($scope.comment);
        	//$scope.comments.push($scope.comment);
            var comment = {"comment": $scope.comment}
            StoryService.AddComment($scope.story._id, comment)
                .then(function(story){
                    $scope.comments = story.comments;
                })
                .catch(function(err){
                    if(err)
                        $scope.error = err;
                })
        };

        $scope.selectUser = function(){
            var user = $scope.author;
            if(user){
                console.log(user);
                $rootScope.selectedUser = user;
                $rootScope.$broadcast('selectedUser', user);
                $location.path("/publicprofile");
            }

        }

        $scope.report = function (){
            if($scope.story){
                console.log("Caught")
                StoryService.reportStoryById($scope.story._id)
                    .then(function(response){
                        $scope.reported = true;
                        console.log("Reported")
                    })
                    .catch(function(err){
                        $scope.error = err;
                    });
            }
        }

        $scope.addToFavorites = function(){
            if($scope.user && $scope.story){
                UserService.addStoryToFavorites($scope.user._id, $scope.story._id)
                    .then(function(response){
                        $scope.notInFavorite = false;
                    })
                .catch(function(err){
                    $scope.error = err;
                });
            }
        }
    };
})();