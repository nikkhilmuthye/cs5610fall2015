(function(){
	'use strict';

	angular
        .module("SportsNewsApp")
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
			role : ["Admin"],
			favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
		},
		{
			id: "9843473b-d068-104e-e46-f623566a5c61",
			username: "aa",
			password: "aa",
			firstname: "Alice",
			lastname: "Wonderland",
			email: "alice@example.com",
			role : ["Admin"],
			favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
		},
		{
			id: "9843473b-d068-104e-e46-f623566a5c62",
			username: "Bob",
			password: "Bob",
			firstname: "Bob",
			lastname: "Marley",
			email: "bob@example.com",
			role : ["User", "Admin"],
			favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
		},
		{
			id: "984dac373b-2345-1578t-e46-86439002834",
			username: "Charlie",
			password: "Charlie",
			firstname: "Charlie",
			lastname: "Sheen",
			email: "charlie@example.com",
			role : ["User"],
			favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
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
            $http.get("/api/project/user")
                .success(function(users){
                    deferred.resolve(users);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
		};

		function findUserByUsernameAndPassword(username, password)
		{
			var deferred = $q.defer();

			console.log(username);
			console.log(password);

			$http.get("/api/project/user?username="+username+"&password="+password)
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

            $http.post("/api/project/user", newuser)
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

            $http.delete("/api/project/user/"+userid)
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

		function updateUser(userid, newuser, callback)
		{
            var deferred = $q.defer();

            $http.put("/api/project /user/"+userid, newuser)
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

		function checkNewUser(username, email)
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