'use strict';

var authStore = require('./stores/auth');

var CallApi = function(method, path, parameters, options) {
  options = options || {};
  var authToken = options.auth || authStore.getAuthToken();
  var url = "/api/" + path;

  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("X-HA-access", authToken);

    req.onload = function() {
      if(req.status > 199 && req.status < 300) {
        resolve(JSON.parse(req.responseText));
      } else {
        // see if we got an error back.
        try {
          reject(JSON.parse(req.responseText));  
        } catch (err) {
          reject({});
        }
      }
    };

    req.onerror = function() {
      reject({});
    };

    if(parameters) {
      req.send(JSON.stringify(parameters));
    } else {
      req.send();
    }

  });
};

if (__DEMO__) {
  CallApi = function(method, path) {
    return new Promise(function(resolve, reject) {

      if (method !== 'GET') {
        throw "URL not implemented in demo mode: /api/" + path;
      }

      // strip off url arguments:
      if (path.indexOf('?') !== -1) {
        path = path.substr(0, path.indexOf('?'));
      }

      switch (path) {
        case 'components':
          resolve(require('./demo/component_data.js'));
          break;
        case 'services':
          resolve(require('./demo/service_data.js'));
          break;
        case 'events':
          resolve(require('./demo/event_data.js'));
          break;
        case 'states':
          resolve(require('./demo/state_data.js'));
          break;
        case 'history/period':
          resolve(require('./demo/state_history_data.js'));
          break;
        default:
          throw "URL not implemented in demo mode /api/" + path;
      }

    });
  };
}

module.exports = CallApi;
