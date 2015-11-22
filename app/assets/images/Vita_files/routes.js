(function() {
  this.app.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $stateProvider.state("index", {
        url: "/",
        views: {
          '': {
            templateUrl: "/.ng",
            controller: "IndexCtrl"
          }
        }
      }).state("main", {
        url: '',
        views: {
          '': {
            templateUrl: "main.ng",
            controller: "MainCtrl"
          }
        }
      }).state("main.services", {
        url: '/servicos',
        views: {
          '': {
            templateUrl: "/servicos.ng",
            controller: "MainServicesCtrl"
          }
        }
      }).state("main.services.home", {
        url: '',
        views: {
          '': {
            templateUrl: "/servicos/home.ng",
            controller: "MainServicesHomeCtrl"
          }
        }
      }).state("main.services.ads", {
        url: '/anuncios',
        views: {
          '': {
            templateUrl: "/servicos/anuncios.ng",
            controller: "MainServicesAdsCtrl"
          }
        }
      }).state("main.services.events", {
        url: '/eventos',
        views: {
          '': {
            templateUrl: "/servicos/eventos.ng",
            controller: "MainServicesEventsCtrl"
          }
        }
      }).state("main.services.professionals", {
        url: '/profissionais',
        views: {
          '': {
            templateUrl: "/servicos/profissionais.ng",
            controller: "MainServicesProfessionalsCtrl"
          }
        }
      }).state("main.services.show_professionals", {
        url: '^/profissionais',
        views: {
          '': {
            templateUrl: "/profissionais.ng",
            controller: "MainServicesIndexProfessionalsCtrl"
          }
        }
      }).state("main.explore", {
        url: '/explorar',
        views: {
          '': {
            templateUrl: "/explorar.ng",
            controller: "MainExploreCtrl"
          }
        }
      }).state("main.event", {
        url: '/eventos',
        views: {
          '': {
            templateUrl: "/eventos.ng",
            controller: "MainEventCtrl"
          }
        }
      }).state("main.event.show", {
        url: '/eventos/:id',
        views: {
          '': {
            templateUrl: function(stateParams) {
              return '/eventos/' + stateParams.id + '.ng';
            },
            controller: "MainEventShowCtrl"
          }
        }
      }).state("main.cinema", {
        url: '/cinema',
        views: {
          '': {
            templateUrl: "/cinema.ng",
            controller: "MainCinemaCtrl"
          }
        }
      }).state("main.photos", {
        url: '/fotos',
        views: {
          '': {
            templateUrl: "/fotos.ng",
            controller: "MainPhotosCtrl"
          }
        }
      }).state("main.blog", {
        url: '/blog',
        views: {
          '': {
            templateUrl: "/blog.ng",
            controller: "MainBlogCtrl"
          }
        }
      });
    }
  ]);

}).call(this);
