(function() {
  this.app.controller('MainExploreCtrl', [
    '$scope', 'Reddit', 'EventsService', '$timeout', function($scope, Reddit, EventsService, $timeout) {
      return $scope.evt = EventsService.all();
    }
  ]);

}).call(this);
