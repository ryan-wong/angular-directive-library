#Modal Service

This is an abstraction of the angular-ui modal service

Basic Modal Example
In this example, we use default modal setting to ask simple questions
```
vm.deleteModal = function() {
    var deleteModalOptions = {
        closeButtonText: 'No',
        actionButtonText: 'Yes',
        headerText: 'Delete',
        bodyText: 'Are you sure you want to delete it?'
    };

    var deleteModalSettings = {
        size: 'md'
    };
    ModalService.showModal(deleteModalSettings, deleteModalOptions).then(function (result) {
        //return from modal
    });
};
```

Advance Modal Example
You can pass in your own controller and specify the size of modal(sm,md,lg).

```
vm.editModal = function() {
    var editModelModalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Update',
        headerText: 'Edit Model',
        includeText: 'editModel.html',
        bodyText: '',
        form: {
           field: '',
           field2: ''
        }
    };

    var editModelModalSettings = {
        size: 'md',
        controller: 'editModelController'
    };

    ModalService.showModal(editModelModalSettings, editModelModalOptions).then(function (editModel) {
    	//do something with model
    });

};
```

Controller Used

```
var EditModelController = function ($modalInstance, customModalOption,
                                    $controller) {

    angular.extend(this, $controller('ModalController', {
        $modalInstance: $modalInstance,
        customModalOption: customModalOption,
        $controller: $controller
    }));

    var vm = this;

    vm.modalOptions.ok = function () {
        if (!vm.formValid()) {
            console.log(vm.errorMessage, vm.errorMapping);
            return false;
        }

        vm.modalOptions.Model.save().then(function(response){
            ModelStudioService.getModelById(vm.modalOptions.Model.getId())
                .then(function(updatedModel){
                    $modalInstance.close(updatedModel);
            }, function(err){
                    vm.stopSpinner();
                    vm.handleError(err);
                });
        }, function(err){
            vm.stopSpinner();
            vm.handleError(err);
        });
    };
};

angular.module('app').controller('editModelController', [
    '$modalInstance',
    'customModalOption',
    '$controller',
    EditModelController]);
```