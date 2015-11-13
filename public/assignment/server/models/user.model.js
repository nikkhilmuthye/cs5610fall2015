var q = require("q");

module.exports = function(mongoose, db){

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete : Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    var users =
        [
            {"id": 123, "firstName": "Alice", 	"lastName": "Wonderland",	"username": "alice", 	"password": "alice"},
            {"id": 234, "firstName": "Bob",	"lastName": "Hope", 		"username": "bob", 	"password": "bob"},
            {"id": 345, "firstName": "Charlie",	"lastName": "Brown", 		"username": "charlie", "password": "charlie"},
            {"id": 456, "firstName": "Dan",	"lastName": "Craig", 		"username": "dan", 	"password": "dan"},
            {"id": 567, "firstName": "Edward",	"lastName": "Norton",		"username": "ed",	"password": "ed"}
        ];

    function Create(userId, user)
    {
        var deferred = q.defer();

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

        return deferred.promise;
    }

    function FindAll()
    {
        var deferred = q.defer();

        try
        {
            return deferred.resolve(users);
        }
        catch(error)
        {
            return deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindById(userId)
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function Update(userId, user)
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function Delete(userId, user)
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function findUserByUsername(username)
    {
        var deferred = q.defer();
        var Founduser, error, found = false;

        try
        {
            users.forEach(
                function(user)
                {
                    if (user.username===username)
                    {
                        Founduser = user;
                    }
                });
            if(Founduser && found)
                return deferred.resolve(Founduser);
            else if(found === true)
                return deferred.reject(error);
            else
                return deferred.reject("Cannot Find User with Username : " + username );
        }
        catch(error)
        {
            return deferred.reject(error);
        }
        return deferred.promise;
    }

    function findUserByCredentials(username, password)
    {
        var deferred = q.defer();
        var Founduser, error, found = false;

        try
        {
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
                return deferred.resolve(Founduser);
            else if(found === true)
                return deferred.reject(error);
            else
                return deferred.reject("Cannot Find User with Username : " + username);
        }
        catch(error)
        {
            return deferred.reject(error);
        }

        return deferred.promise;
    }

};