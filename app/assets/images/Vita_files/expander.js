(function() {
  this.app.directive('expander', function() {
    var link;
    link = function(scope, element, attrs) {
      var loadExpander;
      loadExpander = function() {
        $(element).elastic_grid({
          'showAllText': 'Todos os eventos',
          'filterEffect': 'helix',
          'hoverDirection': true,
          'hoverDelay': 0,
          'hoverInverse': false,
          'expandingSpeed': 500,
          'expandingHeight': 500,
          'items': [
            {
              'title': "title",
              'description': 'Descrição do evento',
              'thumbnail': ['/assets/small/1.jpg', '/assets/small/2.jpg', '/assets/small/3.jpg', '/assets/small/10.jpg', '/assets/small/11.jpg'],
              'large': ['/assets/large/1.jpg', '/assets/large/2.jpg', '/assets/large/3.jpg', '/assets/large/10.jpg', '/assets/large/11.jpg'],
              'button_list': [
                {
                  'title': '+ info',
                  'url': 'http://porfolio.bonchen.net/',
                  'new_window': true
                }, {
                  'title': 'ver fotos',
                  'url': 'http://porfolio.bonchen.net/',
                  'new_window': false
                }
              ],
              'tags': ['Coberturas']
            }
          ]
        });
      };
      return loadExpander();
    };
    return {
      link: link,
      restrict: 'A'
    };
  });

}).call(this);
