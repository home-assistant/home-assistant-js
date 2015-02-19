'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

let initialLoadDone = false;
let loaded = [];

let contains = function(action) {
  return loaded.indexOf(action) !== -1;
};

let allLoaded = function() {
  return loaded.length === 4;
};

let syncStore = {};
_.assign(syncStore, Store.prototype, {
  isFetching() {
    return !allLoaded();
  },

  initialLoadDone() {
    return initialLoadDone;
  },

  componentsLoaded() {
    return contains(constants.ACTION_NEW_LOADED_COMPONENTS);
  },

  eventsLoaded() {
    return contains(constants.ACTION_NEW_EVENTS);
  },

  servicesLoaded() {
    return contains(constants.ACTION_NEW_SERVICES);
  },

  statesLoaded() {
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

export default syncStore;
