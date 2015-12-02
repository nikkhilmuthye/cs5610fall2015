(function(){
    'use strict';

    angular
        .module("SportsNewsApp")
        .factory("TransferService", TransferService);

    function TransferService($http, $q) {

        function guid()
        {
            function s4()
            {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        //Creating a UserService
        var transferService =
        {
            createTransfer: createTransfer,
            findAll: findAll,
            deleteTransfer: deleteTransfer,
            updateTransfer: updateTransfer,
            addlikes: addlikes,
            addDislikes: addDislikes
        };
        return transferService;

        function addDislikes(transferId)
        {
            var deferred = $q.defer();

            try
            {
                if(transferId !== null && typeof transferId === 'string')
                {
                    $http.put("/api/project/transfer/dislike/"+transferId)
                        .success(function(transfers){
                            deferred.resolve(transfers);
                        })
                        .error(function(error){
                            if (error){
                                deferred.reject(error);
                            }
                        });
                }
                else
                {
                    deferred.reject("Please enter valid Transfer ID");
                }
            }
            catch(error)
            {
                deferred.reject(error);
            }
            return deferred.promise;
        }

        function addlikes(transferId)
        {
            var deferred = $q.defer();

            try
            {
                if(transferId !== null && typeof transferId === 'string')
                {
                    $http.put("/api/project/transfer/like/"+transferId)
                        .success(function(transfers){
                            deferred.resolve(transfers);
                        })
                        .error(function(error){
                            if (error){
                                deferred.reject(error);
                            }
                        });
                }
                else
                {
                    deferred.reject("Please enter valid Transfer ID");
                }
            }
            catch(error)
            {
                deferred.reject(error);
            }
            return deferred.promise;
        }

        function createTransfer(userId, transfer)
        {
            var deferred = $q.defer();
            try
            {
                if(transfer !== null && typeof transfer === 'object')
                {

                    transfer.id = guid();
                    transfer.userId = userId;
                    $http.post("/api/project/transfer", transfer)
                        .success(function(newtransfer){
                            console.log("success");
                            deferred.resolve(newtransfer);
                        })
                        .error(function(error){
                            console.log("error");
                            if (error){
                                deferred.reject(error);
                            }
                        });
                }
                else
                {
                    deferred.reject("Please enter valid transfer Details");
                }
            }
            catch(error)
            {
                console.log("Caught exception in createStoryForUser "  + error);
                deferred.reject(error);
            }
            return deferred.promise;
        };

        function deleteTransfer(transferId, callback)
        {
            var deferred = $q.defer();

            try
            {
                if(transferId !== null && typeof transferId === 'string')
                {
                    $http.delete("/api/project/transfer/"+transferId)
                        .success(function(transfers){
                            deferred.resolve(transfers);
                        })
                        .error(function(error){
                            if (error){
                                deferred.reject(error);
                            }
                        });
                }
                else
                {
                    deferred.reject("Please enter valid Transfer ID");
                }
            }
            catch(error)
            {
                deferred.reject(error);
            }
            return deferred.promise;
        };

        function findAll()
        {
            var deferred = $q.defer();

            try
            {
                $http.get("/api/project/transfer")
                    .success(function (transfers) {
                        console.log(transfers);
                        deferred.resolve(transfers);
                    })
                    .error(function (error) {
                        if (error) {
                            deferred.reject(error);
                        }
                    });

                return deferred.promise;
            }
            catch(error)
            {
                console.log("Caught exception in findAll "  + error);
                deferred.reject(error);
            }
        };

        function updateTransfer(transferId, newtransfer)
        {
            var deferred = $q.defer();

            try
            {
                $http.put("/api/project/transfer/"+transferId, newtransfer)
                    .success(function(newtransfer){
                        deferred.resolve(newtransfer);
                    })
                    .error(function(error){
                        if (error){
                            deferred.reject(error);
                        }
                    });
            }
            catch(error)
            {
                deferred.reject(error);
            }
            return deferred.promise;
        };
    };
})();