'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var Store = require('../stores/store');

var loaded = [];

var contains = function(action) {
  return loaded.indexOf(action) !== -1;
};

var syncStore = {};
_.assign(syncStore, Store.prototype, {
  initialLoadDone: function() {
    return loaded.length == 4;
  },

  componentsLoaded: function() {
    return contains(actions.ACTION_NEW_LOADED_COMPONENTS);
  },

  eventsLoaded: function() {
    return contains(actions.ACTION_NEW_EVENTS);
  },

  servicesLoaded: function() {
    return contains(actions.ACTION_NEW_SERVICES);
  },

  statesLoaded: function() {
    return contains(actions.ACTION_NEW_STATES);
  },

});

syncStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case actions.ACTION_NEW_LOADED_COMPONENTS:
    case actions.ACTION_NEW_EVENTS:
    case actions.ACTION_NEW_SERVICES:
    case actions.ACTION_NEW_STATES:
      if (!contains(payload.actionType)) {
        loaded.push(payload.actionType);

        syncStore.emitChange();
      }
      break;

    case actions.ACTION_LOG_OUT:
      loaded = [];
      syncStore.emitChange();
      break;
  }
});

module.exports = syncStore;
