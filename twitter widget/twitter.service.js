'use strict';

angular.module('app').factory('TwitterService', ['$timeout', function ($timeout) {
      return {
          load: function () {
            $timeout(function() {
                $.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
            }, 1000);
          }
      }
  }]);