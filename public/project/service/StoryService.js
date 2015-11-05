(function(){
	'use strict';

	angular
        .module("SportsNewsApp")
        .factory("StoryService", StoryService);

    function StoryService() {
        var stories = [
        {heading: "ff", contents: "ff", id: "4cbe04f5-3463-95e7-a1ab-62b7a11cfd30", userId: "9843473b-d068-104e-e46-f623566a5c61"}
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
			try
			{
				if(story !== null && typeof story === 'object')
				{
					story.id = guid();
					story.userId = userId;
					stories.push(story);
					console.log(story);
					return callback(null, story);
				}
				else
				{
					return("Please enter valid Story Details", null)
				}
			}
			catch(error)
			{
				console.log("Caught exception in createStoryForUser "  + error);
				return callback(error, null);
			}
		};

		function deleteStoryById(storyId, callback)
		{
			try
			{
				if(storyId !== null && typeof storyId === 'string')
				{
					stories.forEach(
						function(story, index)
						{
			 				if (story && story.id === storyId)
			 				{
			 					stories.splice(index, 1);
			 					return callback(null, true);
			 				}
			 			});
					console.log(stories);
					return callback(null, false);
				}
				else
				{
					return("Please enter valid Story ID", null)
				}
			}
			catch(error)
			{
				return callback(error, null);
			}
		};

		function findAllStoryForUser(userId, callback)
		{
			var userStories = [];
			try
			{
				if(userId && typeof userId === 'string')
				{
					stories.forEach(
							function(story)
							{
				 				if (story.userId===userId) 
				 				{	
				 					userStories.push(story);
				 				}
				 			});
		 			return callback(null, userStories);
		 		}
		 		else
		 		{
		 			console.log("Please enter proper User ID");
		 			return callback("Please enter proper User ID", null);
		 		}
		 	}
		 	catch(error)
		 	{
		 		console.log("Caught exception in findAllStoryForUser "  + error);
		 		return callback(error, null);
		 	}
		};

		function updateStoryById(storyId, newstory, callback)
		{
			try
				{
					stories.forEach(
						function(story)
						{
			 				if (story && story.id===storyId) 
			 				{
			 					console.log(story);
			 					for(var parameter in newstory)
									story[parameter] = newstory[parameter];
								return callback(null, story);
			 				}
			 			});
				}
				catch(error)
				{
					return callback(error, null);
				}
				return callback("Cannot Find User with Story ID : : " + storyId , null);
		};
	};
})();