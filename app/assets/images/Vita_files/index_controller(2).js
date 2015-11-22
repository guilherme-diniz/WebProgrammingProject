(function() {
  this.app.controller('MainServicesIndexProfessionalsCtrl', [
    '$scope', 'ProfessionalsService', function($scope, ProfessionalsService) {
      return $scope.professionals = ProfessionalsService.all();
    }
  ]);

}).call(this);
