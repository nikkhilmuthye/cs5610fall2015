(function(){
	'use strict';

	angular
	.module("SportsNewsApp")
	.controller("PrimaryHeaderController", ['$scope', '$location', '$rootScope', 'GlobalService', 'UserService',
            PrimaryHeaderController]);
	
	
	function PrimaryHeaderController($scope, $location, $rootScope, GlobalService, UserService){
		
		$scope.user = $rootScope.user;
		$scope.$location = $location;
        $scope.searchtext = "";

		$scope.logout = function()
		{
            GlobalService.setUser(null);
			$scope.user = $rootScope.user = null;
            $rootScope.$broadcast('loggedin', $scope.user);
			$location.path( "/home" );
		};

		
		$rootScope.$on("loggedin", function(event, user)
		{
			$scope.user = $rootScope.user = user;
		});

		$scope.change = function(){

            if($scope.searchtext && $scope.searchtext != "") {
                $rootScope.searchtext = $scope.searchtext;
                $rootScope.$broadcast('searchtext', $scope.searchtext);
                $location.path("/search");
            }
        }

        $scope.initializeUserOnRefresh = function(){
            var userId;
            if (GlobalService.isAuth()){
                userId = GlobalService.getUser();
                console.log(userId);
                if (userId){
                    UserService.findUserbyId(userId)
                        .then(function(user){
                            $scope.user = $rootScope.user = user;
                            $rootScope.$broadcast('loggedin', $scope.user);
                        })
                        .catch(function(err){
                            if(err)
                                console.log(err);
                        })

                }
            }
        };
        $scope.initializeUserOnRefresh();
	};
})();