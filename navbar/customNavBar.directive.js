'use strict';

angular.module('app')
  .directive('customNavBar', function($location){
    return {
      templateUrl: 'navbar.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.menu = [{
          'title': 'Browse',
          'link': '/search/all/'
        }, {
          'title': 'List',
          'link': '/list'
        }, {
          'title': 'Blog',
          'link': '/blog'
        }];

        scope.isLoggedIn = true;
        scope.isAdmin = false;
        scope.getCurrentUser = Auth.getCurrentUser;
        scope.name = 'Bob';
        scope.photo = '/assets/images/profile.png';
        scope.searchObject = {
          searchField : ''
        };
        scope.logout = function() {
        };

        scope.isActive = function(route) {
          return route === $location.path();
        };

        scope.searchTopBar = function(form) {
          scope.submitted = true;
          if(form.$valid) {
            if (scope.searchObject.searchField.length > 0){
              $location.path('/search/all/' + scope.searchObject.searchField);
            }
          }
        };
      }
    };
  });