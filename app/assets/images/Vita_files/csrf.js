(function() {
  this.app.config([
    '$httpProvider', function($httpProvider) {
      var authToken;
      authToken = $("meta[name=\"csrf-token\"]").attr("content");
      return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
    }
  ]);

}).call(this);
