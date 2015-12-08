(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("StoryController",  ['$scope', '$location', '$rootScope', 'UserService',
            'StoryService', 'GlobalService', StoryController]);

	function StoryController($scope, $location, $rootScope, UserService, StoryService, GlobalService)
	{
        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

		$scope.$location = $location;
		$scope.user = $rootScope.user;
        $scope.reported = false;
        $scope.author = "";
        $scope.img = "../uploads/Mancahester-United-Logo-art.jpg"
		$scope.comments = [];

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

		$rootScope.$on("story", function(event, story){
			$scope.story = $rootScope.story = story;
		});

        $scope.rate = function(){
            console.log($scope.x);
            StoryService.AddRating($scope.story._id, $scope.x)
                .then(function(story){
                    console.log(story);
                    $scope.x = story.rating.rating;
                })
                .catch(function(err){
                    if(err)
                        $scope.error = err;
                })
        }

        $scope.notInFavorite = true;
        $scope.init = function(){
            if($scope.story){
                $scope.x = $scope.story.rating.rating;
                GlobalService.setSelectedStory($scope.story._id);
                if($scope.story.img)
                    $scope.img = "../uploads/"+$scope.story.img;
                $scope.comments = $scope.story.comments;
                UserService.findUserbyId($scope.story.userId)
                    .then(function(user){
                        $scope.author = user;
                    })
                    .catch(function(err){
                        $scope.error =err;
                    })
            }
            else{
                var storyId = GlobalService.getSelectedStory();
                console.log(storyId);
                if(storyId){
                    StoryService.findStoryForUserById(storyId)
                        .then(function(story){
                            $scope.story = story;
                            $scope.comments = story.comments;
                            $scope.init();
                        })
                        .catch(function(err){
                            if(err){
                                $scope.error = err;
                            }
                        })
                }
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