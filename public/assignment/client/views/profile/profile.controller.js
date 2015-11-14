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


		$scope.update = function(){
			$scope.error = null;
			$scope.success = null;
			UserService.updateUser($scope.user.id, $scope.user)
				.then(function(updatedUser){
					console.log(updatedUser);

						$scope.user = updatedUser;
						$scope.success = "Succesfully updated user profile"
						console.log("Succesfully updated user profile");
				})
				.catch(function(error){
					if (error)
					{
						$scope.error = error;
					}
				});
		};
	};

})();