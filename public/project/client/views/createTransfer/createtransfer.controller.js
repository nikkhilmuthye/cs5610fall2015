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


        $scope.create = function(Header){
            $scope.error = null;
            $scope.success = null;

            if (Header)
            {
                var newTransfer = {
                    contents: Header
                }
                TransferService.createTransfer($scope.user._id, newTransfer)
                    .then(function(updatedUser) {
                        console.log(updatedUser);

                        $scope.user = updatedUser;
                        $scope.success = "Succesfully added new story"
                        console.log("Succesfully updated user profile");
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