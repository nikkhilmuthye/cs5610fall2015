module.exports = function(app, model) {
    app.post("/api/project/user", Create);
    app.get("/api/project/user", FindUsers);
    app.get("/api/project/user/:id", FindById);
    app.get("/api/project/user/favoriteTeams/:id", GetAllFavoriteTeams);
    app.get("/api/project/user/favoriteStories/:id", GetAllFavoriteStories);
    app.put("/api/project/user/:id", Update);
    app.put("/api/project/user/:userid/removeTeam", RemoveTeam);
    app.put("/api/project/user/:userid/addTeam", AddTeam);
    app.put("/api/project/user/:userid/removeStory/:id", RemoveStory);
    app.put("/api/project/user/:userid/addStory/:id", AddStory);
    app.delete("/api/project/user/:id", Delete);


    function GetAllFavoriteStories(req, res)
    {
        var userId = req.params.id;

        model
            .GetAllFavoriteStories(userId)
            .then(
            function (favorites) {
                res.json(favorites);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function AddStory(req, res)
    {
        var storyId = req.params.id;
        var userId = req.params.userid;

        model.AddStory(storyId, userId)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function RemoveStory(req, res)
    {
        var storyId = req.params.id;
        var userId = req.params.userid;

        model.RemoveStory(storyId, userId)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function GetAllFavoriteTeams(req, res)
    {
        var userId = req.params.id;

        model
            .GetAllFavoriteTeams(userId)
            .then(
            function (favorites) {
                res.json(favorites);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function AddTeam(req, res)
    {
        var teamUrl = req.body;
        var userId = req.params.userid;

        model.AddTeam(teamUrl.url, userId)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function RemoveTeam(req, res)
    {
        var teamUrl = req.body;
        var userId = req.params.userid;

        console.log(teamUrl);
        console.log(userId);

        model.RemoveTeam(teamUrl.url, userId)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

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