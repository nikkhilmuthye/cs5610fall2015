(function(){
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular.module("SportsNewsApp").service('GlobalService', ['$cookies', '$cookieStore', '$rootScope', GlobalService]);

    //UserService  function
    function GlobalService ($cookies, $cookieStore, $rootScope){

        var globalService = {};
        globalService.selecteduser = null;
        globalService.selectedStory = null;

        globalService.isAuth = function ()
        {
            if (globalService.token == null)
            {
                globalService.token = $cookieStore.get('token');
            }
            if (globalService.selecteduser == null)
            {
                globalService.selecteduser = $cookieStore.get('selecteduser');
            }
            if (globalService.selectedStory == null)
            {
                globalService.selectedStory = $cookieStore.get('selectedStory');
            }
            return (globalService.token != null);
        };

        globalService.setSelectedUser = function(token)
        {
            globalService.selecteduser = token;
            if (globalService.selecteduser == null)
            {
                $cookieStore.remove('selecteduser');
            }
            else
                $cookieStore.put('selecteduser', globalService.selecteduser);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getSelectedUser = function()
        {
            return globalService.selecteduser;
        };

        globalService.setSelectedStory = function(token)
        {
            console.log(token);
            globalService.selectedStory = token;
            if (globalService.selectedStory == null)
            {
                $cookieStore.remove('selectedStory');
            }
            else
                $cookieStore.put('selectedStory', globalService.selectedStory);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getSelectedStory = function()
        {
            return globalService.selectedStory;
        };

        globalService.setUser = function(token)
        {
            globalService.token = token;
            if (globalService.token == null)
            {
                $cookieStore.remove('token');
            }
            else
                $cookieStore.put('', globalService.token);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getUser = function()
        {
            return globalService.token;
        };
        return globalService;
    };

})();