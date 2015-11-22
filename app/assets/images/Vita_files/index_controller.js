(function() {
  this.app.controller('IndexCtrl', [
    '$scope', '$state', function($scope, $state) {
      return $state.transitionTo('main.explore');
    }
  ]);

}).call(this);
