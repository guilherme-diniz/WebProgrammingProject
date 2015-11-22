(function() {
  this.app.directive('resizable', function($window) {
    return function($scope) {
      $scope.initializeMiddleSize = function() {
        return $scope.middleWidth = $('.middle').width();
      };
      $scope.initializeMiddleSize();
      return angular.element($window).bind('resize', function() {
        $scope.initializeMiddleSize();
        return $scope.$apply();
      });
    };
  });

}).call(this);
