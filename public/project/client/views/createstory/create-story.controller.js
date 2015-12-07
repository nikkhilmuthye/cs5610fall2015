(function(){
    'use strict';

    var module1 = angular.module("SportsNewsApp");

    module1.controller("CreateStoryController", ['$scope', '$location', '$rootScope', 'StoryService', CreateStoryController])
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

    function CreateStoryController($scope, $location, $rootScope, StoryService ){

        var cm = this;

        this.filename = $scope.filename;

        $scope.$watch('filename', function(){
            this.filename = $scope.filename;
            console.log(this.filename);
        }.bind(this));

        $scope.img = null;
        var temp = null;

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.filename = "";
        $scope.imageFile = "";

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
            if($scope.story){
                $scope.Header = $scope.story.heading;
                $scope.story = $scope.story.contents;
                $scope.update = true;
            }
            console.log($scope.user);
        };
        $scope.init();

        $scope.clear = function(){
            $scope.story = null;
            $scope.Header = null;
            $scope.selectedstory = null;
        }

        $scope.create = function(Header, story, file){
            $scope.error = null;
            $scope.success = null;

            if (Header && story)
            {

                var newStory = {
                    heading: Header,
                    contents: story,
                    img: file,
                    date : new Date()
                }
                if(!$scope.selectedstory) {
                    console.log(newStory);
                    StoryService.createStoryForUser($scope.user._id, newStory)
                        .then(function (updatedUser) {
                            console.log(updatedUser);
                            $scope.Header = null;
                            $scope.story = null;
                            $scope.user = updatedUser;
                            $scope.success = "Succesfully added new story"
                            console.log("Succesfully updated user profile");
                            $location.path("/profile");
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
                            $scope.user = updatedUser;
                            $scope.success = "Succesfully added new story"
                            console.log("Succesfully updated user profile");
                            $location.path("/profile");
                        })
                        .catch(function (err) {
                            if (error) {
                                $scope.error = error;
                            }
                        });
                }
            }
        };

        $scope.addPhoto = function(){
            console.log($scope.imageFile);
        }

        $scope.onUploadSelect = function($files) {
            console.log($files);
            //$scope.newResource.newUploadName = $files[0].name;
        };

        $scope.uploadFile = function (){

        }
    };


})();