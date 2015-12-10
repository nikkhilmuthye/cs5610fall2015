(function(){
    'use strict';

    var module1 = angular.module("SportsNewsApp");

    module1.controller("CreateStoryController", ['$scope', '$location', '$rootScope', 'StoryService',
        'GlobalService',CreateStoryController])
    module1.directive('file', function(){
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

    function CreateStoryController($scope, $location, $rootScope, StoryService, GlobalService ){

        var cm = this;

        this.filename = $scope.filename;

        $scope.$watch('filename', function(){
            this.filename = $scope.filename;
        }.bind(this));

        $scope.img = null;
        var temp = null;

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.filename = "";
        $scope.imageFile = "";
        $scope.selectedImage = false;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $rootScope.$on("img", function(event, img){
            $scope.img = $rootScope.img = img;
        });

        $rootScope.$on("selectedstory", function(event, story){
            $scope.selectedstory = $rootScope.selectedstory = story;
        });

        $scope.init = function() {
            $scope.update = false;
            if($scope.selectedstory){
                $scope.Header = $scope.selectedstory.heading;
                $scope.story = $scope.selectedstory.contents;
                $scope.update = true;
            }
            console.log($scope.user);
            if(GlobalService.isAuth()) {
                $scope.filename = GlobalService.getSelectedImage();
                console.log($scope.filename);
                if($scope.filename){
                    $scope.selectedImage = true;
                    console.log($scope.selectedImage);
                }
            }
        };
        $scope.init();

        $scope.clear = function(){
            $scope.story = null;
            $scope.Header = null;
            $scope.selectedstory = null;
        }

        $scope.uploadClick = function (file){
            console.log("file : " , file);
            GlobalService.setSelectedImage(null);
            GlobalService.setSelectedImage(file);
        }

        $scope.create = function(Header, story, file){
            $scope.error = null;
            $scope.success = null;

            if (Header && story)
            {

                var image = null;
                if(file){
                    image = file;
                }
                else if ($scope.filename){
                    image = $scope.filename;
                }
                var newRating ={
                    "totalRating" : 0,
                    "totalVotes" : 0,
                    "rating" : 0
                }
                var newStory = {
                    heading: Header,
                    contents: story,
                    img: image,
                    date : new Date(),
                    rating : newRating
                }
                if(!$scope.selectedstory) {
                    console.log(newStory);
                    StoryService.createStoryForUser($scope.user._id, newStory)
                        .then(function (updatedUser) {
                            GlobalService.setSelectedImage(null);
                            console.log(updatedUser);
                            $scope.Header = null;
                            $scope.story = null;
                            $scope.success = "Succesfully added new story"
                            console.log("Succesfully updated user profile");
                            $rootScope.story = updatedUser;
                            $rootScope.$broadcast('story', updatedUser);
                            $location.path("/story");
                        })
                        .catch(function (err) {
                            if (error) {
                                $scope.error = error;
                            }
                        });
                }
                else{
                    StoryService.updateStoryById($scope.selectedstory._id, newStory)
                        .then(function (updatedUser) {
                            console.log(updatedUser);
                            $scope.Header = null;
                            $scope.story = null;
                            $scope.selectedstory = null;
                            $scope.success = "Succesfully added new story"
                            console.log("Succesfully updated user profile");
                            $rootScope.story = updatedUser;
                            $rootScope.$broadcast('story', updatedUser);
                            $location.path("/story");
                        })
                        .catch(function (err) {
                            if (error) {
                                $scope.error = error;
                            }
                        });
                }
            }
        };
    };


})();