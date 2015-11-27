module.exports = function(app, model) {
    app.post("/api/project/user", Create);
    app.get("/api/project/user", FindUsers);
    app.get("/api/project/user/:id", FindById);
    app.put("/api/project/user/:id", Update);
    app.delete("/api/project/user/:id", Delete);


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

    function FindUsers(req, res)
    {
        if(req.query.username)
        {
            if(req.query.password)
            {
                FindUserByUsernameAndPassword(req, res);
            }
            else
            {
                FindUserByUsername(req, res);
            }
        }
        else
        {
            FindAll(req, res);
        }
    }
    function FindAll(req, res)
    {
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

    function FindUserByUsernameAndPassword(req, res){
        var username = req.query.username;
        var password = req.query.password;

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

    function FindUserByUsername(req, res){
        var username = req.query.username;
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