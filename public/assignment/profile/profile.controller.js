(function(){
	'use strict';

	angular
	.module("FormBuilderApp")
	.controller("ProfileController", ['$scope', '$location', '$rootScope', 'UserService', ProfileController]);
	
	function ProfileController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		$rootScope.$on("loggedin", function(event, user){
			$scope.user = $rootScope.user = user;
		});


		$scope.updateuser = function(){
			$scope.error = null;
			$scope.success = null;
			UserService.updateUser($scope.user.id, $scope.user, 
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
						$scope.success = "Succesfully updated user profile"
						console.log("Succesfully updated user profile");
					}
				});
		};
	};

})();