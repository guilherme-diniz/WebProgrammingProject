(function() {
  this.app.filter("propsFilter", function() {
    return function(items, props) {
      var out;
      out = [];
      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var i, itemMatches, keys, prop, text;
          itemMatches = false;
          keys = Object.keys(props);
          i = 0;
          while (i < keys.length) {
            prop = keys[i];
            text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
            i++;
          }
          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        out = items;
      }
      return out;
    };
  });

}).call(this);
