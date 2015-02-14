'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var initialLoadDone = false;
var loaded = [];

var contains = function(action) {
  return loaded.indexOf(action) !== -1;
};

var allLoaded = function() {
  return loaded.length === 4;
};

var syncStore = {};
_.assign(syncStore, Store.prototype, {
  isFetching: function() {
    return !allLoaded();
  },

  initialLoadDone: function() {
    return initialLoadDone;
  },

  componentsLoaded: function() {
    return contains(constants.ACTION_NEW_LOADED_COMPONENTS);
  },

  eventsLoaded: function() {
    return contains(constants.ACTION_NEW_EVENTS);
  },

  servicesLoaded: function() {
    return contains(constants.ACTION_NEW_SERVICES);
  },

  statesLoaded: function() {
    return contains(constants.ACTION_NEW_STATES);
  },

});

syncStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_FETCH_ALL:
      loaded = [];
      syncStore.emitChange();
      break;

    case constants.ACTION_NEW_LOADED_COMPONENTS:
    case constants.ACTION_NEW_EVENTS:
    case constants.ACTION_NEW_SERVICES:
    case constants.ACTION_NEW_STATES:
      if (!contains(payload.actionType)) {
        loaded.push(payload.actionType);

        initialLoadDone = initialLoadDone || allLoaded();

        syncStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      initialLoadDone = false;
      loaded = [];
      syncStore.emitChange();
      break;
  }
});

module.exports = syncStore;
