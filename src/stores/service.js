'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var services = [];

var serviceStore = {};
_.assign(serviceStore, Store.prototype, {
  all: function() {
    return services;
  },

  has: function(domain, service) {
    var found = services.filter(function(serv) {
      return serv.domain == domain && serv.services.indexOf(service) !== -1;
    }, this);

    return found.length > 0;
  },

});

serviceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_SERVICES:
      services = payload.services;
      serviceStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      services = [];
      serviceStore.emitChange();
      break;
  }
});

module.exports = serviceStore;
