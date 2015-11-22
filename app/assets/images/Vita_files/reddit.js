(function() {
  this.app.factory("Reddit", function($http) {
    var Reddit;
    Reddit = function() {
      this.items = [];
      this.busy = false;
      this.after = "";
    };
    Reddit.prototype.nextPage = function() {
      var url;
      if (this.busy) {
        return;
      }
      this.busy = true;
      url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
      $http.jsonp(url).success((function(data) {
        var i, items;
        items = data.data.children;
        i = 0;
        while (i < items.length) {
          this.items.push(items[i].data);
          i++;
        }
        this.after = "t3_" + this.items[this.items.length - 1].id;
        this.busy = false;
      }).bind(this));
    };
    return Reddit;
  });

}).call(this);
