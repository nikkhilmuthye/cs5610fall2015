(function(){
    angular
        .module("SportsNewsApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    redirectTo : "/home" 
                })
                .when("/login", {
                    templateUrl : "/project/login/login.view.html" 
                })
                .when("/home", {
                    templateUrl : "/project/home/home.view.html" 
                })
                .when("/admin", {
                    templateUrl : "/project/admin/admin.view.html" 
                })
                .when("/register", {
                    templateUrl : "/project/register/register.view.html" 
                })
                .when("/profile", {
                    templateUrl : "/project/profile/profile.view.html" 
                })
                .when("/createstory", {
                    templateUrl : "/project/createstory/create-story.view.html" 
                })
                .when("/league", {
                    templateUrl : "/project/league/league.view.html" 
                })
                .when("/team", {
                    templateUrl : "/project/team/team-details.view.html" 
                })
                .when("/transfer", {
                    templateUrl : "/project/transfer/transfer.view.html" 
                })
                .when("/story", {
                    templateUrl : "/project/story/story.view.html" 
                })
                .otherwise({
                    redirectTo : "/home" 
                })
        });
})();