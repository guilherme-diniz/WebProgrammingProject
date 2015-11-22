(function() {
  this.app.controller('MainCtrl', [
    '$scope', '$state', '$window', '$rootScope', 'Reddit', '$http', 'EventsService', function($scope, $state, $window, $rootScope, Reddit, $http, EventsService) {
      return $scope.transitionPage = function(url) {
        return $state.transitionTo('main.' + url);
      };
    }
  ]);

}).call(this);
