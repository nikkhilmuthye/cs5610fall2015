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
            $scope.comments = [];

            if($scope.story){
                if($scope.story.rating)
                    $scope.x = $scope.story.rating.rating;
                GlobalService.setSelectedStory($scope.story._id);
                if($scope.story.img)
                    $scope.img = "../uploads/"+$scope.story.img;
                $scope.story.comments.forEach(function(comment){
                    var temp = comment.split(";");
                    console.log(temp);
                    if(temp[0] && temp[0] != "") {
                        UserService.findUserbyId(temp[0])
                            .then(function (user) {
                                var comment = {"user": user, "comment": temp[1]};
                                $scope.comments.push(comment);
                            })
                            .catch(function (err) {
                                if (err)
                                    $scope.error = err;
                            });
                    }
                    else{
                        var comment = {"user": {"firstName": "Anonymous", "lastName": ""}, "comment": temp[1]};
                        $scope.comments.push(comment);
                    }


                });
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
                            $scope.init();
                        })
                        .catch(function(err){
                            if(err){
                                $scope.error = err;
                            }
                        })
                }
            }

            if($scope.user && $scope.story){
                $scope.user.favoritestories.forEach(function(storyId){
                    if(storyId == $scope.story._id)
                        $scope.notInFavorite = false;
                })
            }
        };
        $scope.init();
        $scope.addComment = function(){

        	//$scope.comments.push($scope.comment);
            if($scope.user)
                var comment = {"comment": $scope.user._id+";"+$scope.comment}
            else
                var comment = {"comment": ";"+$scope.comment}

            console.log(comment);

            StoryService.AddComment($scope.story._id, comment)
                .then(function(story){
                    $scope.comments = [];
                    story.comments.forEach(function(comment){
                        var temp = comment.split(";");
                        console.log(temp);
                        if(temp[0] && temp[0] != "") {
                            UserService.findUserbyId(temp[0])
                                .then(function (user) {
                                    var comment = {"user": user, "comment": temp[1]};
                                    $scope.comments.push(comment);
                                })
                                .catch(function (err) {
                                    if (err)
                                        $scope.error = err;
                                });
                        }
                        else{
                            var comment = {"user": {"firstName": "Anonymous", "lastName": ""}, "comment": temp[1]};
                            $scope.comments.push(comment);
                        }


                    });
                })
                .catch(function(err){
                    if(err)
                        $scope.error = err;
                })
        };

        $scope.selectUser = function(user){
            if(user.firstName != "Anonymous") {
                if (user) {
                    console.log(user);
                    $rootScope.selectedUser = user;
                    $rootScope.$broadcast('selectedUser', user);
                    $location.path("/publicprofile");
                }
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