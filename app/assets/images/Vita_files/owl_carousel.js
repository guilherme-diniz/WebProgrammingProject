(function() {
  this.app.directive('owlcarousel', function() {
    var linker;
    linker = function(scope, element, attr) {
      var loadCarousel, loadCarouselActions;
      loadCarousel = function() {
        element.owlCarousel({
          items: 2,
          pagination: false,
          autoPlay: 10000,
          itemsDesktop: [1000, 1],
          itemsDesktopSmall: [900, 1],
          itemsTablet: [600, 1],
          itemsMobile: false,
          stopOnHover: true
        });
      };
      loadCarouselActions = function() {
        angular.element(".owlcarousel_next").click(function() {
          element.trigger("owl.next");
        });
        angular.element(".owlcarousel_prev").click(function() {
          element.trigger("owl.prev");
        });
        angular.element(".owlcarousel_play").click(function() {
          element.trigger("owl.play", 1000);
        });
        angular.element(".owlcarousel_stop").click(function() {
          element.trigger("owl.stop");
        });
      };
      scope.$watch("items", function(value) {
        loadCarousel(element);
      });
      loadCarouselActions();
    };
    return {
      restrict: "A",
      link: linker
    };
  });

}).call(this);
