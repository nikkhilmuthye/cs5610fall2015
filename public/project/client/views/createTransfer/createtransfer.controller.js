(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .controller("CreateTransferController", ['$scope', '$location', '$rootScope', 'TransferService', CreateTransferController]);

    function CreateTransferController($scope, $location, $rootScope, TransferService ){

        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $rootScope.$on("loggedin", function(event, user){
            $scope.user = $rootScope.user = user;
        });


        $scope.create = function(Header, contents){
            $scope.error = null;
            $scope.success = null;

            if (Header)
            {
                var newTransfer = {
                    heading: Header,
                    contents: contents
                }
                TransferService.createTransfer($scope.user._id, newTransfer)
                    .then(function(updatedUser) {
                        $scope.user = updatedUser;
                        $location.path( "/transfer" );
                    })
                    .catch(function(err){
                        if (error)
                        {
                            $scope.error = error;
                        }
                    });
            }
        };
    };

})();