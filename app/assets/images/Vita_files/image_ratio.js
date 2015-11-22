(function() {
  this.app.directive('imageRatio', function($window) {
    var link;
    link = function(element) {
      var aspectRatio, resizeBg;
      aspectRatio = element.width() / element.height();
      console.log($window.width());
      resizeBg = function() {
        if (($window.width() / $window.height()) < aspectRatio) {
          element.removeClass().addClass("bgheight");
        } else {
          element.removeClass().addClass("bgwidth");
        }
        return $window.resize(resizeBg).trigger;
      };
      return resizeBg();
    };
    return {
      restrict: 'A',
      link: link
    };
  });

}).call(this);
