module.exports = function(app, model) {
    app.post("/api/project/transfer", Create);
    app.get("/api/project/transfer", FindAll);
    app.get("/api/project/transfer/:id", FindById);
    app.get("/api/project/transfer/user/:id", findTransferByUserId);
    app.put("/api/project/transfer/:id", Update);
    app.put("/api/project/transfer/dislike/:id", addDislike);
    app.put("/api/project/transfer/like/:id", addLike);
    app.delete("/api/project/transfer/:id", Delete);

    function addLike(req, res)
    {
        var transferId = req.params.id;

        model.addLike(transferId)
            .then(function(updatedTransfer){
                res.json(updatedTransfer);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function addDislike(req, res)
    {
        var transferId = req.params.id;

        model.addDislike(transferId)
            .then(function(updatedTransfer){
                res.json(updatedTransfer);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function Create(req, res)
    {
        var transfer = req.body;

        model.Create(transfer)
            .then(function(newtransfer){
                res.json(newtransfer);
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
            function (transfers) {
                res.json(transfers);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function FindById(req, res)
    {
        var transferId = req.params.id;

        model
            .FindById(transferId)
            .then(
            function(transfer){
                res.json(transfer);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function Update(req, res)
    {
        var transferId = req.params.id;
        var transfer = req.body;

        model
            .Update(transferId, transfer)
            .then(
            function(transfer){
                res.json(transfer);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function Delete(req, res)
    {
        var transferId = req.params.id;
        var transfer = req.body;

        model
            .Delete(transferId, transfer)
            .then(
            function(transfer){
                res.json(transfer);
            })
            .catch(function(error){
                res.status(400).send(JSON.stringify(error));
            });
    }

    function findTransferByUserId(req, res){
        var transferId = req.params.id;
        if (transferId === null){
            res.status(400).send("Please supply a transferId");
        } else {
            model.findTransferByUserId(transferId)
                .then(function(transfer){
                    res.json(transfer);
                })
                .catch(function(error){
                    console.log('FindUserByUserId error', JSON.stringify(error));
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }

};