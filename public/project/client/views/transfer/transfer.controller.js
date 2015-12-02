(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("TransferController", ['$scope', '$location', '$rootScope', 'UserService', 'TransferService', TransferController]);

    function TransferController($scope, $location, $rootScope, UserService, TransferService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.userStories = [];

        $scope.init = function () {
            console.log("in here");

            TransferService.findAll()
                .then(
                function(transfers)
                {

                    $scope.transfers = transfers;
                    console.log(transfers);
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );

        };
        $scope.init();

        $scope.addDislike = function(index){
            $scope.error = null;
            $scope.success = null;

            TransferService.addDislikes($scope.transfers[index]._id)
                .then(
                function(transfer)
                {
                    $scope.transfers[index] = transfer;
                    console.log("Succesfully added like");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };

        $scope.addlike = function(index){
            $scope.error = null;
            $scope.success = null;

            TransferService.addlikes($scope.transfers[index]._id)
                .then(
                function(transfer)
                {
                    $scope.transfers[index] = transfer;
                    console.log("Succesfully added dislike");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };
    };

})();