(function() {
  this.app.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
    return uiSelectConfig.resetSearchInput = true;
  });

}).call(this);
