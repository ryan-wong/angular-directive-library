/**
 * Created by ryanwong on 2015-10-23.
 */
var UploadService = function ($q, $http, Upload) {

    this.getDeferred = function () {
        return $q.defer();
    };

    this.uploadImage = function (uploadOptions, processResponse) {
        var deferred = this.getDeferred();
        Upload.upload(uploadOptions)
            .then(function (response) {
                deferred.resolve(processResponse(response));
            }, function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };
};

angular.module('app').service('UploadService', ['$q', '$http', 'Upload', UploadService]);