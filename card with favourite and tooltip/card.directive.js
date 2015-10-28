angular.module('app')
  .directive('card', function (model, Auth) {
    return {
      templateUrl: 'components/card/card.html',
      restrict: 'E',
      scope: {
      	model: '=',
      	user: '='
      },
      link: function (scope, element, attrs) {
        scope.favourited = 0;
        scope.showToolTip = false;
        scope.id = scope.model._id;
        var i = 0;

        function isFavourited() {
          //user not logged in
          if (!scope.user){
            return false;
          }

          //set favourite list
          for (i = 0; i < scope.user.favouriteList.length; i++) {
            if (scope.user.favouriteList[i]._id == scope.id){
              scope.favourited = 1;
            }
          }
        }

        function showFavouriteTooltip () {
          if (scope.user){
            scope.showToolTip = false;
          } else {
            scope.showToolTip = true;
          }
        }

      	scope.favouriteModel = function() {
          if (scope.user){
            Auth.favouriteModel({
              model: scope.id,
              state: scope.favourited
            })
            .then(function(result){
              if (scope.favourited == 1){
                scope.favourited = 0;
              } else {
                scope.favourited = 1;
              }
            });
          } else {
            //do something
      	};


        isFavourited();
        showFavouriteTooltip();
	  }
	}
});