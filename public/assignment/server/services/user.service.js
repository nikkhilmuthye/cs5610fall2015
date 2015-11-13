module.exports = function(app, model) {
    app.post("/api/assignment/user", Create);
    app.get("/api/assignment/user", FindUser);
    app.get("/api/assignment/user/:id", FindById);
    app.put("/api/assignment/user/:id", Update);
    app.delete("/api/assignment/user/:id", Delete);


    function Create(req, res)
    {
        var user = req.params["user"];
        model
            .Create(user)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.send(err);
                }
        );
    }

    function FindUser(req, res)
    {
        if(req.params.size == 0) {
            model
                .FindAll()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function(err){
                        res.send(err);
                    }
            );
        }
        else if(req.params.size == 1){
            var username = req.params["username"];

            model
                .findUserByUsername(username)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function(err){
                        res.send(err);
                    }
            );
        }
        else if(req.params.size == 2){
            var username = req.params["username"];
            var password = req.params["password"];

            model
                .findUserByCredentials(username, password)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function(err){
                        res.send(err);
                    }
            );
        }
    }

    function FindById(req, res)
    {
        var userId = req.params["UserId"];

        model
            .FindById(userId)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.send(err);
                }
        );
    }

    function Update(req, res)
    {
        var userId = req.params["UserId"];
        var user = req.params["user"];
        model
            .Update(userId, user)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.send(err);
                }
        );
    }

    function Delete(req, res)
    {
        var userId = req.params["UserId"];
        var user = req.params["user"];
        model
            .Delete(userId, user)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.send(err);
                }
        );
    }
};