(function(){
    'use strict';

    angular
    .module("SportsNewsApp")
    .controller("CreateStoryController", ['$scope', '$location', '$rootScope', 'Upload', 'StoryService', CreateStoryController]);
    
    function CreateStoryController($scope, $location, $rootScope, Upload, StoryService ){

        $scope.submit = function() {
            if (form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: 'upload/url',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
        // for multiple files:


        $(document).ready(function() {
            console.log("Here");

            $('#uploadForm').submit(function() {
                console.log("Here again")
                $("#status").empty().text("File is uploading...");

                $(this).ajaxSubmit({

                    error: function(xhr) {
                        status('Error: ' + xhr.status);
                    },

                    success: function(response) {
                        console.log(response)
                        $("#status").empty().text(response);
                    }
                });

                return false;
            });
        });

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.filename = "";
        $scope.imageFile = "";

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
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
        };
        $scope.init();

        $scope.clear = function(){
            $scope.story = null;
            $scope.Header = null;
            $scope.selectedstory = null;
        }

        $scope.create = function(Header, story){
            $scope.error = null;
            $scope.success = null;

            if (Header && story)
            {
                var newStory = {
                    heading: Header,
                    contents: story,
                    date : new Date()
                }
                if(!$scope.selectedstory) {
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