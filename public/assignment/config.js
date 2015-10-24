(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    redirectTo : "/home" 
                })
                .when("/login", {
                    templateUrl : "/assignment/login/login.view.html" 
                })
                .when("/home", {
                    templateUrl : "/assignment/home/home.view.html" 
                })
                .when("/admin", {
                    templateUrl : "/assignment/admin/admin.view.html" 
                })
                .when("/register", {
                    templateUrl : "/assignment/register/register.view.html" 
                })
                .when("/profile", {
                    templateUrl : "/assignment/profile/profile.view.html" 
                })
                .when("/form", {
                    templateUrl : "/assignment/form/form.view.html" 
                })
                .otherwise({
                    redirectTo : "/home" 
                })
        });
})();