function(){
	'use strict';

	angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
		{
			id: "9843473b-d068-104e-e46-f623566a5c61",
			username: "Alice",
			password: "Alice",
			fname: "Alice",
			lname: "Wonderland",
			email: "alice@example.com"
		},
		{
			id: "9843473b-d068-104e-e46-f623566a5c62",
			username: "Bob",
			password: "Bob",
			fname: "Bob",
			lname: "Marley",
			email: "bob@example.com"
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
			deleteUserById: deleteUserById
		};
		return userService;

		function findAllUsers(callback)
		{
		  	try 
		  	{
		  		return callback(null, users);
		  	} 
		  	catch(error)
		  	{
		  		return callback(error);
		  	}
		  };

		function findUserByUsernameAndPassword(username, password, callback)
		{
			try
			{
				for(var user in users)
				{
					if(user.username == username) 
						if(user.password == password)
							return callback(null, user);
						else
							return callback("Incorrect password" , null);
				}
			}
			catch(error)
			{
				return callback(error, null);
			}
			return callback("Cannot Find User with Username : " + username , null);
		};
    }


})();