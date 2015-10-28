/**
 * Created by ryanwong on 2015-10-22.
 */
var ModalController = function ($modalInstance, customModalOption) {
    this.modalOptions = customModalOption;
    this.errorMessage = '';
    this.errorMapping = {
        'DuplicatedItemIdError': 'Sorry that %s already exist.',
        'InternalServerError': 'Something went wrong on the Server',
        'ItemNotFoundError': 'Sorry %s cannot be found'
    };

    this.replacePlaceholder = function(str, replaceText) {
        return str.replace('%s', replaceText);
    };

    this.modalOptions.ok = function () {
        $modalInstance.close(this.modalOptions);
    };

    this.modalOptions.close = function () {
        $modalInstance.dismiss('cancel');
    };

    this.formValid = function() {
        return true;
    };
};

angular.module('app').controller('modalController', ['$modalInstance', 'customModalOption', ModalController] );