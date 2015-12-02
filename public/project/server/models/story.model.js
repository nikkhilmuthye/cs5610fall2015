var q = require("q");

module.exports = function(app, mongoose, db){

    var StorySchema = require('./story.schema.js');

    var storyModel = mongoose.model("story-project", StorySchema);

    var stories = [
        {
            heading: "Carrick defends Van Gaal: I'll take winning over tactics",
            contents: "ff",
            id: "4cbe04f5-3463-95e7-a1ab-62b7a11cfd30",
            userId: "9843473b-d068-104e-e46-f623566a5c61"
        }
    ];

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete : Delete,
        findStoryByUserId: findStoryByUserId
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

    function Create(newstory)
    {
        var deferred = q.defer();

        try
        {
            if(newstory !== null && typeof newstory === 'object')
            {
                newstory.id = guid();
                storyModel.create(newstory, function(err, newstory){
                    deferred.resolve(newstory);
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
            storyModel.find(function(err, stories) {
                deferred.resolve(stories);
            });
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindById(storyId)
    {
        var deferred = q.defer();

        try{
            var deletedUser, found = false;
            if (typeof storyId === 'undefined' || storyId === null){
                deferred.reject("Please provide valid user id");
            } else {
                storyModel.findById({_id: storyId}, function(err, story){
                    if (story){
                        deferred.resolve(story);
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+storyId);
                    }
                });
            }
        }
        catch(error){
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function Update(storyId, newstory)
    {
        var deferred = q.defer();
        var found = false;
        try
        {
            console.log(newuser);
            storyModel.findById({_id: storyId}, function(err, story){
                if (story){
                    console.log(story);
                    for(var parameter in newstory)
                        story[parameter] = newstory[parameter];
                    story.save(function (err) {
                        if(!err) {
                            console.log(story);
                            deferred.resolve(story);
                        }
                    })
                }
                else if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.reject("no user found with id:"+storyId);
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

    function Delete(storyId, story)
    {
        var deferred = q.defer();

        if (typeof storyId==="undefined" || storyId === null){
            deferred.reject("Please enter a userId");
        } else {
            storyModel.remove({_id: storyId},function(err, stories){
                console.log(stories);
                deferred.resolve(stories);
            });
        }
        return deferred.promise;
    }

    function findStoryByUserId(userId)
    {
        var deferred = q.defer();
        var Founduser, error, found = false;

        try
        {
            storyModel.find({userId: userId}, function(err, stories){
                if(stories)
                    deferred.resolve(stories);
                else
                    deferred.reject("Cannot Find User with userId : " + userId );
            });
        }
        catch(error)
        {
            deferred.reject(error);
        }
        return deferred.promise;
    }
};