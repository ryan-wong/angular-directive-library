#Model

The idea of this is to take a given json object and abstract it with a model.

Then by using dependancy injection, we inject in what you potentially need.

So we have a service that gets Model by ID and create Model.

Models can update itself and delete itself.

Basic usage

Inside Model Service
```
this.getAll = function () {
	var deferred = $q.defer();
	$http.get(this.getAllUrl()).then(function(data){
		deferred.resolve(data.map(function(oneData){
			var newModel = new Model(oneData);
			newModel.setUpdateUrl(self.changeUpdateUrl(oneData.id));
			newModel.setDeleteUrl(self.changeDeleteUrl(oneData.id));
			return newModel;
		}));
	});
	return deferred.promise;
};

this.getById = function (id) {
	var deferred = $q.defer();
	$http.get(this.getById(id)).then(function(oneData){
		var newModel = new Model(oneData);
			newModel.setUpdateUrl(self.changeUpdateUrl(oneData.id));
			newModel.setDeleteUrl(self.changeDeleteUrl(oneData.id));
			return newModel;
		deferred.resolve(newModel);
	});
	return deferred.promise;
};
```

Model Usage
```
	modelObj.setField('abc');
	modelObj.save(function(resultSave){

	});

	modelObj.destroy(function(result){

		});

```

To extend Model

```
 angular.inherits = function (ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false
            }
        });
    };

angular.module('app').factory('ChildModel', ['BaseModel', function(BaseModel){
    function ChildModelClass(data) {
        ChildModelClass.super_.apply(this, [data]);
    }
    angular.inherits(ChildModelClass, BaseModel);
    //override methods
    //make getter and setters
    return ChildModelClass;
```