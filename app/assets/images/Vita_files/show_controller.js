(function() {
  this.app.controller('MainEventShowCtrl', [
    '$scope', 'EventsService', '$stateParams', function($scope, EventsService, $stateParams) {
      return EventsService.find($stateParams.id);
    }
  ]);

}).call(this);
