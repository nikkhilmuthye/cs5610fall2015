(function(){
	'use strict';

	angular
        .module("SportsNewsApp")
        .factory("StoryService", StoryService);

    function StoryService($http, $q) {
        var stories = [
        {heading: "Carrick defends Van Gaal: I'll take winning over tactics", contents: "ff", id: "4cbe04f5-3463-95e7-a1ab-62b7a11cfd30", userId: "9843473b-d068-104e-e46-f623566a5c61"}
        ];

     	function guid() 
        {
		 	function s4() 
		 	{
		 		return Math.floor((1 + Math.random()) * 0x10000)
		 		.toString(16)
		 		.substring(1);
		 	}
		 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		 			s4() + '-' + s4() + s4() + s4();
		 }

		//Creating a UserService
		var storyService = 
		{
			createStoryForUser: createStoryForUser,
			findAllStoryForUser: findAllStoryForUser,
			deleteStoryById: deleteStoryById,
			updateStoryById: updateStoryById
		};
		return storyService;

		function createStoryForUser(userId, story, callback)
	    {
            var deferred = $q.defer();
			try
			{
				if(story !== null && typeof story === 'object')
				{

                    story.id = guid();
                    story.userId = userId;
                    $http.post("/api/project/story", story)
                        .success(function(newstory){
                            console.log("success");
                            deferred.resolve(newstory);
                        })
                        .error(function(error){
                            console.log("error");
                            if (error){
                                deferred.reject(error);
                            }
                        });
				}
				else
				{
                    deferred.reject("Please enter valid Story Details");
				}
			}
			catch(error)
			{
				console.log("Caught exception in createStoryForUser "  + error);
                deferred.reject(error);
			}
            return deferred.promise;
		};

		function deleteStoryById(storyId, callback)
		{
            var deferred = $q.defer();

			try
			{
				if(storyId !== null && typeof storyId === 'string')
				{
                    $http.delete("/api/project/story/"+storyId)
                        .success(function(stories){
                            deferred.resolve(stories);
                        })
                        .error(function(error){
                            if (error){
                                deferred.reject(error);
                            }
                        });
				}
				else
				{
                    deferred.reject("Please enter valid Story ID");
				}
			}
			catch(error)
			{
                deferred.reject(error);
			}
            return deferred.promise;
		};

		function findAllStoryForUser(userId, callback)
		{
            var deferred = $q.defer();
			var userStories = [];
			try
			{
				if(userId && typeof userId === 'string') {

					$http.get("/api/project/story/userId/"+userId)
						.success(function (users) {
							console.log(users);
							deferred.resolve(users);
						})
						.error(function (error) {
							if (error) {
								deferred.reject(error);
							}
						});
				}
		 		else
		 		{
		 			console.log("Please enter proper User ID");
					deferred.reject("Please enter proper User ID");
		 		}
                return deferred.promise;
		 	}
		 	catch(error)
		 	{
		 		console.log("Caught exception in findAllStoryForUser "  + error);
				deferred.reject(error);
		 	}
		};

		function updateStoryById(storyId, newstory, callback)
		{
            var deferred = $q.defer();

			try
            {
                $http.put("/api/project/story/"+storyId, newstory)
                    .success(function(newstory){
                        deferred.resolve(newstory);
                    })
                    .error(function(error){
                        if (error){
                            deferred.reject(error);
                        }
                    });
            }
            catch(error)
            {
                deferred.reject(error);
            }
            return deferred.promise;
		};
	};
})();