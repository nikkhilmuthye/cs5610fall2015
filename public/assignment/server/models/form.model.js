var q = require("q");

module.exports = function(mongoose, db){

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete : Delete,
        findFormByTitle: findFormByTitle
    };
    return api;

    var forms =
        [
            {"id": "000", "title": "Contacts", "userId": 123,
                "fields": [
                    {"id": "111", "label": "First Name", "type": "TEXT", "placeholder": "First Name"},
                    {"id": "222", "label": "Last Name", "type": "TEXT", "placeholder": "Last Name"},
                    {"id": "333", "label": "Address", "type": "TEXT", "placeholder": "Address"},
                    {"id": "444", "label": "State", "type": "OPTIONS", "options": [
                        {"label": "Massachussets", "value": "MA"},
                        {"label": "New Hampshire", "value": "NH"},
                    ]},
                    {"id": "555", "label": "ZIP", "type": "TEXT", "placeholder": "ZIP"},
                    {"id": "666", "label": "Email", "type": "EMAIL", "placeholder": "Email"}
                ]
            },
            {"id": "010", "title": "ToDo", "userId": 234,
                "fields": [
                    {"id": "777", "label": "Title", "type": "TEXT", "placeholder": "Title"},
                    {"id": "888", "label": "Description", "type": "TEXTAREA", "placeholder": "Title"},
                    {"id": "999", "label": "Due Date", "type": "DATE"},
                ]
            }
        ];

    function Create()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function FindAll()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function FindById()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function Update()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function Delete()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

    function findFormByTitle()
    {
        var deferred = q.defer();

        return deferred.promise;
    }

};