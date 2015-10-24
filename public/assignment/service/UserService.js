(function(){
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
			firstname: "Alice",
			lastname: "Wonderland",
			email: "alice@example.com"
		},
		{
			id: "9843473b-d068-104e-e46-f623566a5c62",
			username: "Bob",
			password: "Bob",
			firstname: "Bob",
			lastname: "Marley",
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
			deleteUserById: deleteUserById,
			checkNewUser : checkNewUser
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
			var Founduser, error, found = false;
			
			try
			{
				// for(var user in users)
				// {
				// 	console.log(user);
				// 	if(user.username === username) 
				// 		if(user.password === password)
				// 			return callback(null, user);
				// 		else
				// 			return callback("Incorrect password" , null);
				// }
				users.forEach(
					function(user)
					{
		 				if (user.username===username) 
		 				{
		 					found = true;
		 					if(user.password===password)
		 						Founduser = user;
		 					else
		 						error = "Incorrect password";
		 				}
		 			});
				if(Founduser && found)
					return callback(null, Founduser);
				else if(found === true)
					return callback(error, null);
				else
					return callback("Cannot Find User with Username : " + username , null);
			}
			catch(error)
			{
				return callback(error, null);
			}
		};

		function createUser(newuser, callback)
		{
			try
			{
				if(newuser !== null && typeof newuser === 'object')
				{
					newuser.id = guid();
					users.push(newuser);
					return callback(null, newuser);
				}
				else
				{
					return("Please enter valid User Details", null)
				}
			}
			catch(error)
			{
				return callback(error, null);
			}
		};

		function deleteUserById(userid, callback)
		{
			try
			{
				if(newuser !== null && typeof newuser === 'string')
				{
					var userremoved = users.filter(
						function (user) {
                        	return user.id !== userid;
                       });
					return callback(null, userremoved);
				}
				else
				{
					return("Please enter valid User ID", null)
				}
			}
			catch(error)
			{
				return callback(error, null);
			}
		};

		function updateUser(userid, newuser, callback)
		{
			console.log(newuser);
			try
			{
				/*for(var user in users)
				{
					if(user.id === userid) 
					{
						for(var parameter in user)
							user[parameter] = newuser[parameter];
						return callback(null, user);
					}
						
				}*/
				users.forEach(
					function(user)
					{
		 				if (user && user.id===userid) 
		 				{
		 					console.log(user);
		 					for(var parameter in user)
								user[parameter] = newuser[parameter];
							return callback(null, user);
		 				}
		 			});
			}
			catch(error)
			{
				return callback(error, null);
			}
			return callback("Cannot Find User with Username : " + username , null);
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