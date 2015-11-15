(function(){
	'use strict';

	angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var users = [
		{
			id: "9843473b-d068-104e-e46-f623566a5c61",
			username: "Alice",
			password: "Alice",
			firstname: "Alice",
			lastname: "Wonderland",
			email: "alice@example.com",
			role : ["Student"]
		},
		{
			id: "9843473b-d068-104e-e46-f623566a5c62",
			username: "Bob",
			password: "Bob",
			firstname: "Bob",
			lastname: "Marley",
			email: "bob@example.com",
			role : ["Faculty", "Admin"]
		},
		{
			id: "984dac373b-2345-1578t-e46-86439002834",
			username: "Charlie",
			password: "Charlie",
			firstname: "Charlie",
			lastname: "Sheen",
			email: "charlie@example.com",
			role : []
		}];

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
		var userService = 
		{
			findAllUsers: findAllUsers,
			createUser: createUser,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			updateUser: updateUser,
			deleteUserById: deleteUserById,
			checkNewUser : checkNewUser
		};
		return userService;

		function findAllUsers()
		{
            var deferred = $q.defer();
            console.log("in here");
            $http.get("/api/assignment/user")
                .success(function(users){
                    deferred.resolve(users);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};

		function findUserByUsernameAndPassword(username, password)
		{
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .success(function(user){
                    deferred.resolve(user);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};

		function createUser(newuser)
		{
			var deferred = $q.defer();
            console.log(newuser);

			$http.post("/api/assignment/user", newuser)
				.success(function(newUser){
					console.log("success");
					deferred.resolve(newUser);
				})
				.error(function(error){
					console.log("error");
					if (error){
						deferred.reject(error);
					}
				});

			return deferred.promise;
		};

		function deleteUserById(userid)
		{
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/"+userid)
                .success(function(users){
                    deferred.resolve(users);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};

		function updateUser(userid, newuser)
		{
			console.log(newuser);
            var deferred = $q.defer();

            $http.put("/api/assignment/user/"+userid, newuser)
                .success(function(newuser){
                    deferred.resolve(newuser);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};

		function checkNewUser(username, email, users)
		{
			console.log("i am here");
			var exists = false;
			var emailExists = false;
			var errorMessage = null;
			users.forEach(
				function(user)
				{
					if (user && user.username===username)
					{
						exists = true;
					}
					if (user && user.email === email){
						emailExists = true;
					} 
				});
			if (exists)
			{
				errorMessage = errorMessage + "User already exists with that username.";
			} 
			if (emailExists)
			{
				errorMessage = errorMessage + "User already exists with that email.";
			} 
			console.log("i am here");
			return errorMessage;
		};
    }

})();