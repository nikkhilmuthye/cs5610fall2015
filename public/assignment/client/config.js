(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    redirectTo : "/home" 
                })
                .when("/login", {
                    templateUrl : "/assignment/client/views/login/login.view.html"
                })
                .when("/home", {
                    templateUrl : "/assignment/client/views/home/home.view.html"
                })
                .when("/admin", {
                    templateUrl : "/assignment/client/views/admin/admin.view.html"
                })
                .when("/register", {
                    templateUrl : "/assignment/client/views/register/register.view.html"
                })
                .when("/profile", {
                    templateUrl : "/assignment/client/views/profile/profile.view.html"
                })
                .when("/form", {
                    templateUrl : "/assignment/client/views/form/form.view.html"
                })
                .when("/user/:userId/form/:formId/fields", {
                    templateUrl : "/assignment/client/views/field/field.view.html"
                })
                .otherwise({
                    redirectTo : "/home" 
                })
        });
})();