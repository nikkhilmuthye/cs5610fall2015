var q = require("q");

module.exports = function(app, mongoose, db){

    var OptionsSchema = mongoose.Schema({
            "label" : String,
            "value" : String
    });

    var FieldSchema = mongoose.Schema({
            "id": String,
            "label" : String,
            "type" : String,
            "placeholder" : String,
            "options" : [OptionsSchema]
    });

    var FormSchema = mongoose.Schema({
        "id": String,
        "title" : String,
        "userId" : String,
        "fields" : [FieldSchema]
    }, {collection: "form"});

    var FormModel = mongoose.model("form", FormSchema);

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





    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function Create(userId, form)
    {
        var deferred = q.defer();

        try{
            if(form !== null && typeof form === 'object'
               && userId !== null)
            {
                form.id = guid();
                form.userId = userId;

                forms.push(form);

                FormModel.create(form, function(err, forms){
                    deferred.resolve(forms);
                });

                //deferred.resolve(form);
            }
            else
            {
                deferred.reject("Please enter valid Form Details")
            }
        }
        catch(error)
        {
            console.log("Caught exception in createFormForUser "  + error);
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindAll()
    {
        var deferred = q.defer();

        try
        {
            FormModel.find(function(err, forms) {
                deferred.resolve(forms);
            });
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindAllForUser(userId)
    {
        var deferred = q.defer();

        var userForms = [];

        try
        {

            if(userId)
            {
                /*forms.forEach(
                    function(form)
                    {
                        if (form.userId==userId)
                        {
                            userForms.push(form);
                        }
                    });
                deferred.resolve(userForms);*/
                FormModel.find({userId: userId}, function(err, forms){
                    if (forms){
                        deferred.resolve(forms);
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });
            }
            else
            {
                console.log("Please enter proper User ID");
                deferred.reject("Please enter proper User ID");
            }
        }
        catch(error)
        {
            console.log("Caught exception in findAllFormsForUser "  + error);
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function FindById(formId)
    {
        var deferred = q.defer();
        var requestedform, found = false;
        try{
            if (formId && typeof formId !== "undefined"){
                FormModel.findById({_id: formId}, function(err, forms){
                    if (forms){
                        deferred.resolve(forms);
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("No form with formId:"+formId+" exists in th DB");
                    }
                });
                /*forms.forEach(function(form, index){
                    if (form.id == formId){
                        found =  true;
                        requestedform = form;
                    }
                });
                if (found){
                    deferred.resolve(requestedform);
                } else {
                    deferred.reject("No form with formId:"+formId+" exists in th DB");
                }*/
            }
            else {
                deferred.reject("please provide a formId");
            }
        }
        catch(error){
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function Update(formId, newForm)
    {
        var deferred = q.defer();
        var found =  false;
        var userId = "";
        var userForms = [];
        try
        {
            FormModel.update({_id: formId}, {$set: newForm},
                function(err,result){
                    if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(newForm);
                    }
                });
            /*forms.forEach(
                function(form)
                {
                    if (form && form.id==formId)
                    {
                        found  = true;
                        userId = form.userId;

                        for(var parameter in newForm) {

                            form[parameter] = newForm[parameter];
                        }
                        deferred.resolve(newForm);
                    }
                });*/
            /*forms.forEach(
                function(form) {
                    if (form && form.userId == userId) {
                        userForms.push(form);
                    }
                });*/
            //deferred.resolve(userForms);
        }
        catch(error)
        {
            deferred.reject(error);
        }
        if(!found)
            deferred.reject("Cannot Find User with Form ID : : " + formId);

        return deferred.promise;
    }

    function Delete(formId)
    {
        var deferred = q.defer();
        var found = false, userId;
        var userforms = [];
        try
        {
            if(formId !== null && typeof formId === 'string')
            {
                FormModel.findById({_id: formId}, function(err, forms){
                    if (forms) {
                        userId = forms.userId;
                        FormModel.remove({_id: formId}, function (err, forms) {

                            FormModel.find({userId: userId}, function (err, forms) {
                                if (forms) {
                                    deferred.resolve(forms);
                                }
                                else if (err) {
                                    deferred.reject(err);
                                }
                                else {
                                    deferred.reject("no user found with id:" + userId);
                                }
                            });
                        });
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });

                /*forms.forEach(
                    function(form, index)
                    {
                        if (form && form.id === formId)
                        {
                            found = true;
                            userId = form.userId;
                            forms.splice(index, 1);
                        }
                    });
                if(found){
                    forms.forEach(function(form, index){
                        if (form && form.userId == userId){
                            userforms.push(form);
                        }
                    })
                    deferred.resolve(userforms);
                }
                else{
                    deferred.reject("Cannot Find User with Form ID : : " + formId);
                }*/
            }
            else
            {
                deferred.reject("Please enter valid Form ID")
            }
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function findFormByTitle(title)
    {
        var deferred = q.defer();

        var requestedform, found = false;
        try{
            if (title && typeof title !== "undefined"){

                FormModel.findOne({title: title}, function(err, forms){
                    if (forms){
                        deferred.resolve(forms);
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("No form with formId:"+formId+" exists in th DB");
                    }
                });

                /*forms.forEach(function(form, index){
                    if (form.title == title){
                        found =  true;
                        requestedform = form;
                    }
                });
                if (found){
                    deferred.resolve(requestedform);
                } else {
                    deferred.reject("No form with formId:"+formId+" exists in th DB");
                }*/
            }
            else {
                deferred.reject("please provide a formId");
            }
        }
        catch(error){
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function DeleteField(formId, fieldId)
    {
        var deferred = q.defer();
        var found = false, foundfield = false, selectedform;
        var userforms = [];
        try
        {
            if(formId !== null && typeof formId === 'string')
            {
                FormModel.findById({_id: formId}, function(err,form){
                    if(err){
                        deferred.reject(err);
                    }
                    else {
                        form.fields.pull(fieldId);
                        form.save(function (err) {
                            if (!err) {
                                FormModel.findById({_id: formId}, function (err, forms) {
                                    if(err){
                                        deferred.reject(err);
                                    }
                                    else{
                                        deferred.resolve(form.fields);
                                    }

                                })
                            }
                            else
                            {
                                deferred.reject(err);
                            }
                        });
                    }
                });
                /*FormModel.findById({_id: formId}, function(err, form){
                    if (form) {
                        form.fields[0].remove();
                        form.save(function (err) {
                            if (!err) {
                                console.log('Success!');
                                deferred.resolve(form.fields);
                            }
                            else
                            {
                                deferred.reject(err);
                            }
                        })
                        console.log(form.fields);

                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });
                });
                forms.forEach(
                    function(form, index)
                    {
                        if (form && form.id === formId)
                        {
                            found = true;
                            selectedform = form;
                        }
                    });
                if(found){
                    selectedform.fields.forEach(function(field, index){
                        if (field && field.id == fieldId){
                            selectedform.fields.splice(index, 1);
                        }
                    })
                    deferred.resolve(selectedform.fields);
                }
                else{
                    deferred.reject("Cannot Find Field with Field ID : : " + fieldId);
                }*/
            }
            else
            {
                deferred.reject("Please enter valid Field ID")
            }
        }
        catch(error)
        {
            deferred.reject(error);
        }

        return deferred.promise;
    }


    function CreateField(formId, field)
    {
        var deferred = q.defer();
        var found = false, foundfield = false, selectedform;

        try
        {
            if(formId !== null && typeof formId === 'string' && field != null)
            {
                FormModel.findById({_id: formId}, function(err, form){
                    if (form) {
                        field.id = guid();
                        form.fields.push(field);
                        form.save(function (err) {
                            if (!err) {
                                FormModel.findById({_id : formId}, function(err, form){
                                    if(err){
                                        deferred.reject(err);
                                    }
                                    else {
                                        form.fields.forEach(
                                            function(formfield, index)
                                            {
                                                if (formfield && formfield.id === field.id)
                                                {
                                                    deferred.resolve(formfield);
                                                }
                                            });
                                    }
                                });
                            }
                            else
                            {
                                deferred.reject(err);
                            }
                        });
                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });


                /*forms.forEach(
                    function(form, index)
                    {
                        if (form && form.id === formId)
                        {
                            found = true;
                            selectedform = form;
                        }
                    });
                if(found){
                    field.id = guid();
                    selectedform.fields.push(field);

                    deferred.resolve(field);
                }
                else{
                    deferred.reject("Cannot Find Form with Form ID : : " + formId);
                }*/
            }
            else
            {
                deferred.reject("Please enter valid Form ID")
            }
        }
        catch(error)
        {
            console.log(error);
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function CloneField(formId, field, index)
    {
        var deferred = q.defer();
        var found = false, foundfield = false, selectedform;

        try
        {
            if(formId !== null && typeof formId === 'string' && field != null)
            {
                FormModel.findById({_id: formId}, function(err, form){
                    if (form) {
                        field.id = guid();
                        form.fields.splice(index+1, 0, field);
                        form.save(function (err) {
                            if (!err) {
                                FormModel.findById({_id : formId}, function(err, form){
                                   if(err){
                                       deferred.reject(err);
                                   }
                                    else {
                                       form.fields.forEach(
                                           function(formfield, index)
                                           {
                                               if (formfield && formfield.id === field.id)
                                               {
                                                   deferred.resolve(formfield);
                                               }
                                           });
                                   }
                                });

                            }
                            else
                            {
                                deferred.reject(err);
                            }
                        });;

                    }
                    else if(err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.reject("no user found with id:"+userId);
                    }
                });

                /*forms.forEach(
                    function(form, index)
                    {
                        if (form && form.id === formId)
                        {
                            found = true;
                            selectedform = form;
                        }
                    });
                if(found){
                    field.id = guid();
                    selectedform.fields.splice(index+1, 0, field);

                    deferred.resolve(field);
                }
                else{
                    deferred.reject("Cannot Find Form with Form ID : : " + formId);
                }*/
            }
            else
            {
                deferred.reject("Please enter valid Form ID")
            }
        }
        catch(error)
        {
            console.log(error);
            deferred.reject(error);
        }

        return deferred.promise;
    }

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete : Delete,
        findFormByTitle: findFormByTitle,
        FindAllForUser : FindAllForUser,
        DeleteField : DeleteField,
        CreateField : CreateField,
        CloneField : CloneField
    };
    return api;

};