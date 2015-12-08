(function(){
	'use strict';

	angular
        .module("SportsNewsApp")
        .factory("StoryService", StoryService);

    function StoryService($http, $q) {

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
            findStoryForUserById: findStoryForUserById,
			deleteStoryById: deleteStoryById,
			updateStoryById: updateStoryById,
            findAll: findAll,
            approveStoryById: approveStoryById,
            reportStoryById: reportStoryById,
            findAllReportedStories: findAllReportedStories,
            AddComment: AddComment,
            AddRating: AddRating
		};
		return storyService;

        function AddRating(storyId, rating){
            var deferred = $q.defer();

            try
            {
                $http.put("/api/project/story/"+storyId+"/addRating/" + rating)
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
        }

        function AddComment(storyId, comment){
            var deferred = $q.defer();

            try
            {
                $http.put("/api/project/story/"+storyId+"/addComment", comment)
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
        }

        function reportStoryById(storyId){
            var deferred = $q.defer();

            console.log(storyId)

            $http.get("/api/project/story/report/"+storyId)
                .success(function(user){
                    console.log(user);
                    deferred.resolve(user);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }

        function approveStoryById(storyId){
            var deferred = $q.defer();

            console.log(storyId);

            $http.delete("/api/project/story/approve/"+storyId)
                .success(function(user){
                    console.log(user);
                    deferred.resolve(user);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }

		function createStoryForUser(userId, story)
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

		function deleteStoryById(storyId)
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

        function findAllReportedStories()
        {
            var deferred = $q.defer();

            console.log("here");
            try
            {
                $http.get("/api/project/story/reported")
                    .success(function (users) {
                        console.log(users);
                        deferred.resolve(users);
                    })
                    .error(function (error) {
                        if (error) {
                            deferred.reject(error);
                        }
                    });

                return deferred.promise;
            }
            catch(error)
            {
                console.log("Caught exception in findAllStoryForUser "  + error);
                deferred.reject(error);
            }
        };

        function findAll()
        {
            var deferred = $q.defer();

            console.log("here");
            try
            {
                $http.get("/api/project/story")
                    .success(function (users) {
                        console.log(users);
                        deferred.resolve(users);
                    })
                    .error(function (error) {
                        if (error) {
                            deferred.reject(error);
                        }
                    });

                return deferred.promise;
            }
            catch(error)
            {
                console.log("Caught exception in findAllStoryForUser "  + error);
                deferred.reject(error);
            }
        };

		function findAllStoryForUser(userId)
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

        function findStoryForUserById(storyId)
        {
            var deferred = $q.defer();

            try
            {
                if(storyId && typeof storyId === 'string') {

                    $http.get("/api/project/story/"+storyId)
                        .success(function (story) {
                            console.log(story);
                            deferred.resolve(story);
                        })
                        .error(function (error) {
                            if (error) {
                                deferred.reject(error);
                            }
                        });
                }
                else
                {
                    console.log("Please enter proper story ID");
                    deferred.reject("Please enter proper story ID");
                }
                return deferred.promise;
            }
            catch(error)
            {
                console.log("Caught exception in findAllStoryForUser "  + error);
                deferred.reject(error);
            }
        };

		function updateStoryById(storyId, newstory)
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