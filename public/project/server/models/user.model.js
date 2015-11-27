var q = require("q");

module.exports = function(app, mongoose, db){

    var users = [
        {
            id: "9843473b-d068-104e-e46-f623566a5c61",
            username: "alice",
            password: "alice",
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
            username: "bob",
            password: "bob",
            firstname: "Bob",
            lastname: "Marley",
            email: "bob@example.com",
            role : ["User", "Admin"],
            favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
        },
        {
            id: "984dac373b-2345-1578t-e46-86439002834",
            username: "charlie",
            password: "charlie",
            firstname: "Charlie",
            lastname: "Sheen",
            email: "charlie@example.com",
            role : ["User"],
            favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
        },
        {
            "id": "456",
            "firstName": "Dan",
            "lastName": "Craig",
            "username": "dan",
            "password": "dan",
            email: "bob@example.com",
            role : ["User", "Admin"],
            favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
        },
        {
            "id": "567",
            "firstName": "Edward",
            "lastName": "Norton",
            "username": "ed",
            "password": "ed",
            email: "bob@example.com",
            role : ["User", "Admin"],
            favoriteteams : ["Manchester United", "Real Madrid", "Barcelona"]
        }
    ]


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


    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function Create(newuser)
    {
        var deferred = q.defer();

        try
        {
            if(newuser !== null && typeof newuser === 'object')
            {
                newuser.id = guid();
                users.push(newuser);
                deferred.resolve(newuser);
            }
            else
            {
                deferred.reject("Please enter valid User Details");
            }
        }
        catch(error)
        {
            console.log(error);
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindAll()
    {
        var deferred = q.defer();
        try
        {

            deferred.resolve(users);
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindById(userId)
    {
        var deferred = q.defer();

        try{
            var deletedUser, found = false;
            if (typeof userId === 'undefined' || userId === null){
                deferred.reject("Please provide valid user id");
            } else {
                users.forEach(function(user){
                    if (user && user.id==userId)
                    {
                        found = true;
                        deletedUser = user;
                    }
                });
                if (found){
                    deferred.resolve(deletedUser);
                } else {
                    deferred.reject("no user found with id:"+instanceId);
                }
            }
        }
        catch(error){
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function Update(userId, newuser)
    {
        var deferred = q.defer();
        var found = false;
        try
        {
            console.log(newuser);
            users.forEach(
                function(user)
                {
                    if (user && user.id==userId)
                    {
                        found = true;
                        for(var parameter in user)
                            user[parameter] = newuser[parameter];
                        deferred.resolve(user);
                    }
                });
        }
        catch(error)
        {
            deferred.reject(error);
        }
        if(!found) {
            deferred.reject("Cannot Find User with Username : " + user.username);
        }
        return deferred.promise;
    }

    function Delete(userId, user)
    {
        var deferred = q.defer();

        if (typeof userId==="undefined" || userId === null){
            deferred.reject("Please enter a userId");
        } else {
            users.forEach(function (user, index) {
                if (user.id == userId) {
                    users.splice(index, 1);
                    console.log("Userid :  " + userId + "succesfully deleted");

                }
            });
            deferred.resolve(users);
        }
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
                deferred.resolve(Founduser);
            else if(found === true)
                deferred.reject(error);
            else
                deferred.reject("Cannot Find User with Username : " + username );
        }
        catch(error)
        {
            deferred.reject(error);
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
                deferred.resolve(Founduser);
            else if(found === true)
                deferred.reject(error);
            else
                deferred.reject("Cannot Find User with Username : " + username);
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

};