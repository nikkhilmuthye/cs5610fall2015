var q = require("q");

module.exports = function(app, mongoose, db){

    var UserSchema = require('./user.schema.js');

    var userModel = mongoose.model("user", UserSchema);

    var users =
        [
            {"id": 123, "firstName": "Alice", 	"lastName": "Wonderland",	"username": "alice", 	"password": "alice"},
            {"id": 234, "firstName": "Bob",	"lastName": "Hope", 		"username": "bob", 	"password": "bob"},
            {"id": 345, "firstName": "Charlie",	"lastName": "Brown", 		"username": "charlie", "password": "charlie"},
            {"id": 456, "firstName": "Dan",	"lastName": "Craig", 		"username": "dan", 	"password": "dan"},
            {"id": 567, "firstName": "Edward",	"lastName": "Norton",		"username": "ed",	"password": "ed"}
        ];


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
                console.log(newuser);
                userModel.create(newuser, function(err, users){
                    deferred.resolve(users);
                });
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
            userModel.find(function(err, users) {
                deferred.resolve(users);
            });
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
                userModel.findById({_id: userId}, function(err, user){
                    if (user){
                        deferred.resolve(user);
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });
                /*users.forEach(function(user){
                    if (user && user.id==userId)
                    {
                        found = true;
                        deletedUser = user;
                    }
                });*/

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
            userModel.findById({_id: userId}, function(err, user){
                if (user){
                    console.log(user);
                    for(var parameter in newuser)
                        user[parameter] = newuser[parameter];
                    user.save(function (err) {
                        if(!err) {
                            console.log(user);
                            deferred.resolve(user);
                        }
                    })
                }
                else if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.reject("no user found with id:"+userId);
                }
            });
            /*users.forEach(
                function(user)
                {
                    if (user && user.id==userId)
                    {
                        found = true;
                        for(var parameter in user)
                            user[parameter] = newuser[parameter];
                        deferred.resolve(user);
                    }
                });*/
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function Delete(userId, user)
    {
        var deferred = q.defer();

        if (typeof userId==="undefined" || userId === null){
            deferred.reject("Please enter a userId");
        } else {
            userModel.remove({_id: userId},function(err, users){
                console.log(users);
                deferred.resolve(users);
            });
            /*users.forEach(function (user, index) {
                if (user.id == userId) {
                    users.splice(index, 1);
                    console.log("Userid :  " + userId + "succesfully deleted");

                }
            });*/
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
            userModel.findOne({username: username}, function(err, user){
                if(user)
                    deferred.resolve(user);
                else
                    deferred.reject("Cannot Find User with Username : " + username );
            });
            /*users.forEach(
                function(user)
                {
                    if (user.username===username)
                    {
                        Founduser = user;
                    }
                });*/
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
            userModel.findOne({username: username, password: password}, function(err, Founduser){
                if(Founduser)
                    deferred.resolve(Founduser);
                else
                    deferred.reject("Cannot Find User with Username : " + username);
            });
            /*users.forEach(
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
                deferred.reject("Cannot Find User with Username : " + username);*/
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

};