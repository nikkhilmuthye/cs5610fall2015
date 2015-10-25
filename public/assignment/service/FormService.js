(function(){
	'use strict';

	angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

    	
    	var forms = [];

    	var formService = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};

		return formService;

    	function guid() 
        {
		 	function s4() 
		 	{
		 		return Math.floor((1 + Math.random()) * 0x10000)
		 		.toString(16)
		 		.substring(1);
		 	}
		 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		 };

	    function createFormForUser(userId, form, callback)
	    {
			try
			{
				if(form !== null && typeof form === 'object')
				{
					form.id = guid();
					form.userId = userId;
					console.log(form);
					forms.push(form);
					console.log(forms);
					return callback(null, form);
				}
				else
				{
					return("Please enter valid Form Details", null)
				}
			}
			catch(error)
			{
				console.log("Caught exception in createFormForUser "  + error);
				return callback(error, null);
			}
		};

		function deleteFormById(formId, callback)
		{
			try
			{
				if(formId !== null && typeof formId === 'string')
				{
					var formremoved = forms.filter(
						function (form) {
	                    	return form.name !== formId;
	                   });
					return callback(null, formremoved);
				}
				else
				{
					return("Please enter valid Form ID", null)
				}
			}
			catch(error)
			{
				return callback(error, null);
			}
		};

		function findAllFormsForUser(userId, callback)
		{
			var userForms = [];
			try
			{
				if(userId && typeof userId === 'string')
				{
					forms.forEach(
							function(form)
							{
				 				if (form.userId===userId) 
				 				{	
				 					userForms.push(form);
				 				}
				 			});
		 			return callback(null, userForms);
		 		}
		 		else
		 		{
		 			console.log("Please enter proper User ID");
		 			return callback("Please enter proper User ID", null);
		 		}
		 	}
		 	catch(error)
		 	{
		 		console.log("Caught exception in findAllFormsForUser "  + error);
		 		return callback(error, null);
		 	}
		};

		function updateFormById(formId, newForm, callback)
		{
			try
				{
					forms.forEach(
						function(form)
						{
			 				if (form && form.id===formId) 
			 				{
			 					console.log(form);
			 					for(var parameter in newForm)
									form[parameter] = newuser[parameter];
								return callback(null, form);
			 				}
			 			});
				}
				catch(error)
				{
					return callback(error, null);
				}
				return callback("Cannot Find User with Form ID : : " + formId , null);
		};
	};
})();