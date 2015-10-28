/**
 * Created by ryanwong on 2015-10-20.
 */

angular.module('app').factory('BaseModel', ['$http', '$q', function($http, $q){
    function BaseModelClass (data) {
        this.$http = $http;
        this.$q = $q;
        this.data = data;
        this.url = {
            get: '',
            post: '',
            put: '',
            delete: ''
        };
    }

    BaseModelClass.prototype.setUpdateUrl = function(url) {
        this.url.update = url;
    };

    BaseModelClass.prototype.setRemoveUrl = function(url) {
        this.url.delete = url;
    };

    BaseModelClass.prototype.setGetUrl = function(url) {
        this.url.get = url;
    };

    BaseModelClass.prototype.getUpdateUrl = function() {
        return this.url.update;
    };

    BaseModelClass.prototype.getRemoveUrl = function() {
        return this.url.delete;
    };

    BaseModelClass.prototype.getGetUrl = function() {
        return this.url.get;
    };

    BaseModelClass.prototype.toJson = function() {
        return JSON.stringify(this.data);
    };

    BaseModelClass.prototype.destroy = function() {
        return this.$http.delete(this.url.delete);
    };

    BaseModelClass.prototype.save = function() {
        return this.$http.put(this.url.update);
    };

    return BaseModelClass;
}]);