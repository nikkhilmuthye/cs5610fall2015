(function(){
    'use strict';

    angular
    .module("SportsNewsApp")
    .controller("ProfileController", ['$scope', '$location', '$rootScope', 'UserService', 'GlobalService',
            'StoryService', ProfileController])
        .directive('filename', function(){
            return {
                scope: {
                    file: '='
                },
                link: function(scope, el, attrs){
                    el.bind('change', function(event){
                        var files = event.target.files;
                        var file = files[0];
                        scope.file = file ? file.name : undefined;

                        scope.$apply();
                    });
                }
            };
        });
    
    function ProfileController($scope, $location, $rootScope, UserService, GlobalService, StoryService ){

        var cm = this;

        this.filename = $scope.filename;

        $scope.$watch('filename', function(){
            this.filename = $scope.filename;
            //$scope.init();
        }.bind(this));

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.isAdmin = false;

        $scope.img = null;
        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
            $scope.init();
        });

        $scope.uploadClick = function (file){
            console.log("file : " , file);
            $scope.img = file;
            GlobalService.setSelectedImage(null);
            GlobalService.setSelectedImage(file);
        }

        $scope.userStories = [];
        $scope.updateSelected = false;
        $scope.verifypassword = null;
        
         $scope.init = function () {
            if($scope.user)
            {
                $scope.user.role.forEach(function(role){
                    if(role == "admin"){
                        $scope.isAdmin = true;
                    }
                });

                var img = "../uploads/Mancahester-United-Logo-art.jpg"
                if($scope.user.img){
                    console.log("here")
                    $scope.user.img = "../uploads/"+$scope.user.img;
                }
                else{
                    $scope.user.img = img;
                }

                if(GlobalService.isAuth()) {
                    $scope.filename = GlobalService.getSelectedImage();
                    console.log($scope.filename);

                    if($scope.filename){
                        $scope.selectedImage = true;
                        console.log($scope.selectedImage);
                        $scope.user.img = "../uploads/"+$scope.filename;
                        $scope.selectedImage = false;
                    }
                }
            }
        };
        $scope.init();

        $scope.selectUpdate = function(){
            $scope.updateSelected = true;
        }

        $scope.cancel = function(){
            $scope.updateSelected = false;
        }

        $scope.update = function(verifypassword){
            $scope.error = null;
            $scope.success = null;

            console.log($scope.user);
            console.log($scope.user.password);
            console.log($scope.user.verifypassword);
            console.log($scope.filename);
            $scope.user.img = $scope.filename;
            if($scope.user.password == $scope.user.verifypassword) {
                UserService.updateUser($scope.user._id, $scope.user)
                    .then(
                    function (updatedUser) {
                        console.log(updatedUser);
                        $scope.user = updatedUser;
                        GlobalService.setSelectedImage(null);
                        $scope.success = "Succesfully updated user profile"
                        console.log("Succesfully updated user profile");
                        $scope.updateSelected = false;
                        $scope.selectedImage = false;

                        var img = "../uploads/Mancahester-United-Logo-art.jpg"
                        if($scope.user.img){
                            console.log("here")
                            $scope.user.img = "../uploads/"+$scope.user.img;
                        }
                        else{
                            $scope.user.img = img;
                        }
                    })
                    .catch(function (error) {
                        $scope.error = error;
                    });
            }
            else
            {
                $scope.error = "Cannot verify password";
            }
        }

        $scope.updateStory = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.findStoryForUserById($scope.userStories[index]._id)
                .then(
                function(story)
                {
                    if(story)
                    {
                        console.log(story);
                        $rootScope.story = story;
                        $rootScope.$broadcast('selectedstory', story);
                        $location.path( "/createstory" );
                    }
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };

        $scope.deleteStory = function(index){
            $scope.error = null;
            $scope.success = null;
            StoryService.deleteStoryById($scope.userStories[index]._id)
                .then(
                function(stories)
                {
                    console.log(stories);
                    $scope.userStories = stories;


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