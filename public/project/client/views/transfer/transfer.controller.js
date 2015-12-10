(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("TransferController", ['$scope', '$location', '$rootScope', '$timeout',
            'UserService', 'TransferService', TransferController]);

    function TransferController($scope, $location, $rootScope, $timeout, UserService, TransferService ){

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

        $scope.addDislike = function(transfer){
            $scope.error = null;
            $scope.success = null;

            TransferService.addDislikes(transfer._id)
                .then(
                function(transfernew)
                {
                    var index1;
                    $scope.transfers.forEach(function(trans, index){
                        if(trans._id == transfernew._id)
                            index1 = index;
                    })
                    console.log(transfernew);
                    console.log(transfernew);
                    setTimeout(function(){
                        console.log('First name being reset');
                        $scope.$apply(function(){
                                $scope.transfers[index1] = transfernew;
                            }
                        )
                    }, 10);

                    console.log("Succesfully added like");
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };

        $scope.addlike = function(transfer){
            $scope.error = null;
            $scope.success = null;

            TransferService.addlikes(transfer._id)
                .then(
                function(transfernew)
                {
                    var index1;
                    $scope.transfers.forEach(function(trans, index){
                        if(trans._id == transfernew._id)
                            index1 = index;
                    })
                    console.log(transfernew);
                    console.log(transfernew);
                    setTimeout(function(){
                        console.log('First name being reset');
                        $scope.$apply(function(){
                                $scope.transfers[index1] = transfernew;
                            }
                        )
                    }, 10);
                })
                .catch(
                function(error){
                    $scope.error = error;
                }
            );
        };
    };

})();