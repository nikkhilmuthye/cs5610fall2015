(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("FavoritesController", ['$scope', '$location', '$rootScope', 'UserService', '$http',
            'StoryService', FavoritesController]);

    function FavoritesController($scope, $location, $rootScope, UserService, $http, StoryService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.isAdmin = false;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.favorites = [];
        $scope.updateSelected = false;

        $scope.init = function () {
            if($scope.user)
            {
                UserService.getAllFavorite($scope.user._id)
                    .then(function (favorites) {
                        console.log(favorites);
                        favorites.forEach(function(fav, index){
                            $http({
                                headers: {'X-Auth-Token': '7da7a8a5ea4b46e8a834318a57ca8634'},
                                url: fav,
                                dataType: 'json',
                                type: 'GET'
                            }).success(function (response) {
                                console.log(response);
                                $scope.favorites.push(response.name);
                            });
                        })
                    })
                    .catch(function(err){
                        if(err)
                            $scope.err = err;
                    });

                $scope.user.role.forEach(function(role){
                    if(role == "admin"){
                        $scope.isAdmin = true;
                    }
                });
            }
        };
        $scope.init();

        $scope.deleteFavorite = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.deleteStoryById($scope.userStories[index]._id)
                .then(
                function(stories)
                {
                    console.log(stories);
                    $scope.favorites = stories;


                    $scope.success = "Succesfully updated user profile"
                    console.log("Succesfully updated user profile");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };
    };

})();