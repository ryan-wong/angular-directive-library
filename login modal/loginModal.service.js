angular.module('app')
.service('loginModal', function ($uibModal, $window) {
	this.loginPopup = function (scope) {
      scope.modalConfig = {
          dismissable: true,
          title: 'Login'
      };
	scope.modalElement = $uibModal.open({
	    templateUrl: 'loginModal.html',
	    windowClass: 'modal-default',
	    scope: scope
	});
      scope.$on('login-close-modal', function(event, args) {
          scope.modalElement.dismiss(event);
          $window.location.reload();
      });
	};

	return this;
})
.factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore,
 $q, toastService, $state) {
  var currentUser = {},
  currentUserSync = null;
  if($cookieStore.get('token')) {
    currentUser = User.get();
  }

  return {
    namespace: 'auth_',
    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    login: function(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).
      success(function(data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
        currentUser.$promise.then(function(promiseData){
          currentUserSync = promiseData;
          if (promiseData.status == 'unverified') {
            toastService.message('warning', 'Please verify your account');
          }
        })
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },

    /**
     * Delete access token and user info
     *
     * @param  {Function}
     */
    logout: function() {
      $cookieStore.remove('token');
      currentUser = {};
    },

    /**
     * Gets all available info on authenticated user
     *
     * @return {Object} user
     */
    getCurrentUser: function() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @return {Boolean}
     */
    isLoggedIn: function() {
      return currentUser.hasOwnProperty('role');
    },

    /**
     * Get auth token
     */
    getToken: function() {
      return $cookieStore.get('token');
    },

    notLoginAction : function(url, action) {
      window.localStorage.setItem(this.namespace + 'url', url);
      window.localStorage.setItem(this.namespace + 'urlData', JSON.stringify(action));
      $state.go('login', {});
    },

    processActionAfterLogin: function(cb) {
      var url = window.localStorage.getItem(this.namespace + 'url');
      var process = JSON.parse(window.localStorage.getItem(this.namespace + 'urlData'));
      var self = this;
      localStorage.removeItem(this.namespace + 'url');
      localStorage.removeItem(this.namespace + 'urlData');
      currentUser = User.get();
      if (url && process) {
        switch (process.action) {
          case 'contact':
            if (process.name && process.email && process.message && process.model){
              $http.post('/api/v1/model/contact', {
                email: process.email,
                name: process.name,
                message: process.message,
                model: process.model
              })
              .success(function(data) {
                return cb(null, url);
              })
              .error(function(err) {
                return cb(null, false);
              });
            }
            break;
          case 'favourite':
            if (process.model && process.state === 0) {
              currentUser.$promise.then(function(data){
                User.favouriteModel({ id: data._id }, {
                  model: process.model,
                  state: process.state
                }, function(user) {
                  return cb(null, url);
                }, function(err) {
                  return cb(null,false);
                }).$promise;
              })
            }
            break;
          default:
            break;
        }
      } else {
        return cb(null, false);
      }
    }
  };
})
.controller('LoginCtrl', function ($scope, Auth, $location, $state) {
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    if(form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then( function() {
        // Logged in, redirect to home
        Auth.processActionAfterLogin(function(e, result){
          if (result){
            $rootScope.$broadcast('login-close-modal');
            //redirect to last page
            $location.path(result);
          } else {
            $rootScope.$broadcast('login-close-modal');
            $state.go('main', {});
          }
        });
      })
      .catch( function(err) {
        $scope.errors.other = err.message;
      });
    }
  };
});
