(function(){
    angular
        .module("SportsNewsApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    redirectTo : "/home" 
                })
                .when("/login", {
                    templateUrl : "/project/client/views/login/login.view.html"
                })
                .when("/home", {
                    templateUrl : "/project/client/views/home/home.view.html"
                })
                .when("/admin", {
                    templateUrl : "/project/client/views/admin/admin.view.html"
                })
                .when("/register", {
                    templateUrl : "/project/client/views/register/register.view.html"
                })
                .when("/profile", {
                    templateUrl : "/project/client/views/profile/profile.view.html"
                })
                .when("/createstory", {
                    templateUrl : "/project/client/views/createstory/create-story.view.html"
                })
                .when("/createtransfer", {
                    templateUrl : "/project/client/views/createtransfer/createtransfer.view.html"
                })
                .when("/league", {
                    templateUrl : "/project/client/views/league/league.view.html"
                })
                .when("/team", {
                    templateUrl : "/project/client/views/team/team-details.view.html"
                })
                .when("/transfer", {
                    templateUrl : "/project/client/views/transfer/transfer.view.html"
                })
                .when("/story", {
                    templateUrl : "/project/client/views/story/story.view.html"
                })
                .when("/personal", {
                    templateUrl : "/project/client/views/personal/personal.view.html"
                })
                .when("/favorites", {
                    templateUrl : "/project/client/views/favorites/favorites.view.html"
                })
                .when("/reported", {
                    templateUrl : "/project/client/views/reported/reported.view.html"
                })
                .when("/publicprofile", {
                    templateUrl : "/project/client/views/publicprofile/publicprofile.view.html"
                })
                .when("/search", {
                    templateUrl : "/project/client/views/search/search.view.html"
                })
                .when("/publicprofile", {
                    templateUrl : "/project/client/views/publicprofile/publicprofile.view.html"
                })
                .otherwise({
                    redirectTo : "/home" 
                })
        });
})();