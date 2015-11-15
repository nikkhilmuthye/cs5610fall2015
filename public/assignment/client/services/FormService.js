(function(){
	'use strict';

	angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

    	
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

	    function createFormForUser(userId, form)
	    {
			var deferred = $q.defer();

			$http.post("/api/assignment/user/"+userId+"/form",form)
				.success(function(newForm){
					deferred.resolve(newForm);
				})
				.error(function(error){
					if (error){
						deferred.reject(error);
					}
				});
			return deferred.promise;
		};

		function deleteFormById(formId)
		{
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/"+formId)
                .success(function(userForms){
                    deferred.resolve(userForms);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};

		function findAllFormsForUser(userId)
		{
			var deferred = $q.defer();

			$http.get("/api/assignment/form/user/"+userId)
				.success(function(userForms){

					deferred.resolve(userForms);
				})
				.error(function(error){
					if (error){
						deferred.reject(error);
					}
				});
			return deferred.promise;
		};

		function updateFormById(formId, newForm)
		{
            var deferred = $q.defer();

            $http.put("/api/assignment/form/"+formId, newForm)
                .success(function(formAfterUpdate){
                    deferred.resolve(formAfterUpdate);
                })
                .error(function(error){
                    if (error){
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
		};
	};
})();