(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("StoryController",  ['$scope', '$location', '$rootScope', 'UserService', StoryController]);

	function StoryController($scope, $location, $rootScope, UserService)
	{
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		$scope.comments = [];

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });


        $scope.addComment = function(){
        	console.log($scope.comment);
        	$scope.comments.push($scope.comment);
        };
    };
})();