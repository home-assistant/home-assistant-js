'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var services = [];

var _getDomain = function(domain) {
  return _.find(services, function(service) { return service.domain === domain; });
};

var serviceStore = {};
_.assign(serviceStore, Store.prototype, {
  all: function() {
    return services;
  },

  has: function(domain, service) {
    var domainObj = _getDomain(domain);

    return domainObj && domainObj.services.indexOf(service) !== -1;
  },

});

serviceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_SERVICES:
      services = payload.services;
      serviceStore.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_SERVICE_REGISTERED) {
        var data = payload.event.data;

        var domainObj = _getDomain(data.domain);

        if (domainObj) {
          domainObj.services.push(data.service);
        } else {
          services.push({domain: data.domain, services: [data.service]});
        }

        serviceStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      services = [];
      serviceStore.emitChange();
      break;
  }
});

module.exports = serviceStore;
