(function() {
  this.app.service('EventsService', [
    '$http', function($http) {
      var allRequestDoing, allRequestDone, events, queue, self;
      self = this;
      events = null;
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
            return callback(events);
          }
        });
        if (allRequestDone) {
          return events;
        }
        if (!allRequestDoing) {
          allRequestDoing = true;
          events = [];
          $http.get('/eventos.json').then(function(response) {
            $.merge(events, response.data.events);
            allRequestDoing = false;
            allRequestDone = true;
            return queue.execute();
          });
        }
        return events;
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
        return self.all(events)(function() {
          var e, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = events.length; _i < _len; _i++) {
            e = events[_i];
            if (parseInt(e._id.$oid) === parseInt(id)) {
              if (callback) {
                _results.push(callback(e));
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
      self.save = function(currentEvent, callback) {
        var data, http, method, url;
        if (currentEvent.id) {
          url = "/events/" + currentEvent.id + ".json";
          method = "PUT";
        } else {
          url = "/events.json";
          method = "POST";
        }
        data = {
          currentEvent: currentEvent
        };
        http = $http({
          method: method,
          url: url,
          data: data
        });
        http.success(function(response) {
          if (response.currentEvent) {
            if (method === "POST") {
              events.unshift(angular.extend(currentEvent, response.job));
            } else {
              self.find(currentEvent.id, function(currentEventToUpdate) {
                return angular.extend(currentEventToUpdate, currentEvent);
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
      self["delete"] = function(currentEventToDelete, callback) {
        var http;
        http = $http({
          method: 'DELETE',
          url: "/events/" + currentEventToDelete.id + ".json"
        });
        return http.success(function(response) {
          var currentEvent, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = events.length; _i < _len; _i++) {
            currentEvent = events[_i];
            if (parseInt(currentEvent.id) === parseInt(currentEventToDelete.id)) {
              if (response.success) {
                events.splice(_i, 1);
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
