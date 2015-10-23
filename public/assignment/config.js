function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "index.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "admin.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin.html",
                    controller: "AdminController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();