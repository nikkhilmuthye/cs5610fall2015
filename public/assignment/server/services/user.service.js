module.exports = function(app, model) {
    app.post("/api/assignment/user", Create);
    app.get("/api/assignment/user", FindAll);
    app.get("/api/assignment/user/:id", FindById);
    app.put("/api/assignment/user/:id", Update);
    app.delete("/api/assignment/user/:id", Delete);
    app.get("/api/assignment/user/:username", FindUserByUsername);
    app.get("/api/assignment/user/:username/:password", FindUserByUsernameAndPassword);


    function Create(req, res)
    {
        var user = req.body;

        model.Create(user)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function FindAll(req, res)
    {
        console.log("in here 1");
        model
            .FindAll()
            .then(
                function (users) {
                    res.json(users);
                })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function FindById(req, res)
    {
        var userId = req.params.id;

        model
            .FindById(userId)
            .then(
                function(user){
                    res.json(user);
                })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function Update(req, res)
    {
        var userId = req.params.id;
        var user = req.body;

        model
            .Update(userId, user)
            .then(
                function(user){
                    res.json(user);
                })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function Delete(req, res)
    {
        var userId = req.params.id;
        var user = req.body;

        model
            .Delete(userId, user)
            .then(
                function(user){
                    res.json(user);
                })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function FindUserByUsernameAndPassword(req, res, next){
        var username = req.params.username;
        var password = req.params.password;

        if (username === null){
            res.status(400).send("Please supply a username");
        } else if(password === null){
            res.status(400).send("Please supply a password");
        } else {
            model.findUserByCredentials(username, password)
                .then(function(user){
                    res.json(user);
                })
                .catch(function(error){
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }

    function FindUserByUsername(req, res, next){
        var username = req.params.username;
        if (username === null){
            res.status(400).send("Please supply a username");
        } else {
            model.findUserByUsername(username)
                .then(function(user){
                    res.json(user);
                })
                .catch(function(error){
                    console.log('getUserByUsername user error', JSON.stringify(error));
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }
};