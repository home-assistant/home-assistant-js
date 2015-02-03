'use strict';

var authStore = require('./stores/auth');

module.exports = function(method, path, parameters, options) {
  options = options || {};
  var authToken = options.auth || authStore.getAuthToken();
  var url = "/api/" + path;

  // set to true to generate a frontend to be used as demo on the website
  if (false) {
    if (path === "states" || path === "services" || path === "events") {
      url = "/demo/" + path + ".json";
    } else {
      return;
    }
  }

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
