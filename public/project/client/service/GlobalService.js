(function(){
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular.module("SportsNewsApp").service('GlobalService', ['$cookies', '$cookieStore', '$rootScope', GlobalService]);

    //UserService  function
    function GlobalService ($cookies, $cookieStore, $rootScope){

        var globalService = {};
        globalService.selecteduser = null;
        globalService.selectedStory = null;
        globalService.selectedimg = null;
        globalService.selectedleague = null;
        globalService.selectedteam = null;

        globalService.isAuth = function ()
        {
            if (globalService.token == null)
            {
                globalService.token = $cookieStore.get('user');
            }
            if (globalService.selecteduser == null)
            {
                globalService.selecteduser = $cookieStore.get('selecteduser');
            }
            if (globalService.selectedStory == null)
            {
                globalService.selectedStory = $cookieStore.get('selectedStory');
            }
            if (globalService.selectedimg == null)
            {
                globalService.selectedimg = $cookieStore.get('selectedimg');
            }
            return (globalService.token != null);
        };

        globalService.isSelected = function ()
        {
            if (globalService.selectedleague == null)
            {
                globalService.selectedleague = $cookieStore.get('selectedleague');
            }
            if (globalService.selectedteam == null)
            {
                globalService.selectedteam = $cookieStore.get('selectedteam');
            }
            return ((globalService.selectedteam != null) || ((globalService.selectedleague != null)));
        };

        globalService.setSelectedLeague = function(token)
        {
            globalService.selectedleague = token;

            if (globalService.selectedleague == null)
            {
                console.log("Removing Previous League")
                $cookieStore.remove('selectedleague');
            }
            else
            {
                $cookieStore.put('selectedleague', globalService.selectedleague);
            }
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getSelectedLeague = function()
        {
            return $cookieStore.get('selectedleague');
        };

        globalService.setSelectedTeam = function(token)
        {
            globalService.selectedteam = token;
            if (globalService.selectedteam == null)
            {
                $cookieStore.remove('selectedteam');
            }
            else
                $cookieStore.put('selectedteam', globalService.selectedteam);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getSelectedTeam = function()
        {
            return $cookieStore.get('selectedteam');
        };

        globalService.setSelectedImage = function(token)
        {
            globalService.selectedimg = token;
            if (globalService.selectedimg == null)
            {
                $cookieStore.remove('selectedimg');
            }
            else
                $cookieStore.put('selectedimg', globalService.selectedimg);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getSelectedImage = function()
        {
            return globalService.selectedimg;
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
                $cookieStore.remove('user');
            }
            else
                $cookieStore.put('user', globalService.token);
            // $cookieStore.putokent('token', globalService.token);
        };

        globalService.getUser = function()
        {
            return globalService.token;
        };
        return globalService;
    };

})();