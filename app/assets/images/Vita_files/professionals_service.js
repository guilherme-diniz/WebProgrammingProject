(function() {
  this.app.service('ProfessionalsService', [
    '$http', function($http) {
      var allRequestDoing, allRequestDone, professionals, queue, self;
      self = this;
      professionals = null;
      allRequestDone = false;
      allRequestDoing = false;
      queue = (function() {
        var enqueue, execute, fns, ready;
        ready = false;
        fns = [];
        enqueue = function(fn) {
          if (ready) {
            return fn();
          } else {
            return fns.push(fn);
          }
        };
        execute = function() {
          var fn, _i, _len, _results;
          ready = true;
          _results = [];
          for (_i = 0, _len = fns.length; _i < _len; _i++) {
            fn = fns[_i];
            if (fn) {
              fn();
            }
            _results.push(delete fns[_i]);
          }
          return _results;
        };
        return {
          execute: execute,
          enqueue: enqueue
        };
      })();
      self.all = function(callback) {
        queue.enqueue(function() {
          if (callback) {
            return callback(professionals);
          }
        });
        if (allRequestDone) {
          return professionals;
        }
        if (!allRequestDone) {
          allRequestDoing = true;
          professionals = [];
          $http.get('/profissionais.json').then(function(response) {
            $.merge(professionals, response.data.professionals);
            allRequestDoing = false;
            allRequestDone = true;
            return queue.execute();
          });
        }
        return professionals;
      };
      self["new"] = function() {
        return {
          name: null,
          description: null,
          rating: null,
          tags: [],
          area: null,
          price: null,
          on_air_til: null
        };
      };
      self.find = function(id, callback) {
        return self.all(p)(function() {
          var professional, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = p.length; _i < _len; _i++) {
            professional = p[_i];
            if (parseInt(professional.id) === parseInt(id)) {
              if (callback) {
                _results.push(callback(professional));
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      };
      self.save = function(professional, callback) {
        var data, http, method, url;
        if (professional.id) {
          url = "/professionals/" + professional.id + ".json";
          method = "PUT";
        } else {
          url = "/professionals.json";
          method = "POST";
        }
        data = {
          professional: professional
        };
        http = $http({
          method: method,
          url: url,
          data: data
        });
        http.success(function(response) {
          if (response.professional) {
            if (method === "POST") {
              professionals.unshift(angular.extend(professional, response.job));
            } else {
              self.find(professional.id, function(professionalToUpdate) {
                return angular.extend(professionalToUpdate, professional);
              });
            }
          }
          if (callback) {
            return callback(response);
          }
        });
        return http.error(response)(function() {
          if (callback) {
            return callback(response);
          }
        });
      };
      self["delete"] = function(professionalToDelete, callback) {
        var http;
        http = $http({
          method: 'DELETE',
          url: "/professionals/" + professionalToDelete.id + ".json"
        });
        return http.success(function(response) {
          var professional, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = professionals.length; _i < _len; _i++) {
            professional = professionals[_i];
            if (parseInt(professional.id) === parseInt(professionalToDelete.id)) {
              if (response.success) {
                professionals.splice(_i, 1);
              }
              if (callback) {
                _results.push(callback(response));
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      };
    }
  ]);

}).call(this);
