/**
 * Created by ryanwong on 2015-10-21.
 */
var modalService = function ($uibModal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'app/common/modal/modal.html',
        size: 'sm'
    }, modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (tempModalDefaults.controller != undefined){
            tempModalDefaults.controller = tempModalDefaults.controller + ' as vm';
        } else {
            tempModalDefaults.controller = 'modalController as vm';
        }

        tempModalDefaults.resolve = {
            customModalOption: function() {
                return tempModalOptions;
            }
        };
        return  $uibModal.open(tempModalDefaults).result;
    };
};
angular.module("app").service('ModalService', ['$uibModal', modalService]);