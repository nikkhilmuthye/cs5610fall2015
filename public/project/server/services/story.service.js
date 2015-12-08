module.exports = function(app, model) {
    app.post("/api/project/story", Create);
    app.post("/api/project/story", Create);
    app.get("/api/project/story", FindAll);
    app.get("/api/project/story/reported", FindAllReported);
    app.get("/api/project/story/:id", FindById);
    app.delete("/api/project/story/approve/:id", ApproveById);
    app.get("/api/project/story/report/:id", ReportById);
    app.get("/api/project/story/userId/:id", FindByUserId);
    app.put("/api/project/story/:id", Update);
    app.put("/api/project/story/:id/addComment", AddComment);
    app.delete("/api/project/story/:id", Delete);


    function AddComment(req, res){
        var storyId = req.params.id;
        var comment = req.body;

        model.AddComment(storyId, comment.comment)
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

    function FindStories(req, res)
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
    function FindAllReported(req, res)
    {
        model
            .FindAllReported()
            .then(
            function (users) {
                res.json(users);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
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

    function ApproveById(req, res)
    {
        var storyId = req.params.id;

        model
            .ApproveById(storyId)
            .then(
            function(story){
                res.json(story);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function ReportById(req, res)
    {
        var storyId = req.params.id;

        model
            .ReportById(storyId)
            .then(
            function(story){
                res.json(story);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function FindById(req, res)
    {
        var storyId = req.params.id;

        model
            .FindById(storyId)
            .then(
            function(story){
                res.json(story);
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

    function FindByUserId(req, res){
        var userId = req.params.id;
        if (userId === null){
            res.status(400).send("Please supply a userId");
        } else {
            model.findStoryByUserId(userId)
                .then(function(user){
                    res.json(user);
                })
                .catch(function(error){
                    console.log('FindUserByUserId error', JSON.stringify(error));
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }

};