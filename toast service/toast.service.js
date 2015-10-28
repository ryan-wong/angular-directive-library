'use strict';

angular.module('app')
  .service('toastService', function (toastr, toastrConfig) {
    var toastObj =  {
    	message: function(type, msg) {
    		toastrConfig.positionClass = 'toast-bottom-center';
    		toastrConfig.timeout = 800;
    		toastrConfig.extendedTimeout = 0;
    		toastrConfig.autoDismiss = true;
    		toastrConfig.newestOnTop = true;
    		toastrConfig.maxOpened = 1;
			toastrConfig.preventDuplicates = true;
			toastrConfig.preventOpenDuplicates = true;
			toastr[type](msg, '');
    	}
    };

    return toastObj;
  });
