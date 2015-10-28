'use strict';

angular.module('app')
  .service('someService', function ($q, $http) {
    var cache = {
    };
    this.service = function (page) {
        var deferred = $q.defer();
        if (cache['service' + '_' + page]) {
          deferred.resolve(cache['service' + '_' + page]);
        } else{
          $http.get('/api/v1/service/' + page)
  	        .success(function(data) {
              cache['service' + '_' + page] = data;
  	        	deferred.resolve(data);
  	        })
  	        .error(function(err) {
      				deferred.reject(err);
  	        });
        }
        return deferred.promise;
    };
    return this;
  });
