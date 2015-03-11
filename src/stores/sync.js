'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

const NUM_TYPES = 4;

let initialLoadDone = false;
let loaded = [];

function contains(action) {
  return loaded.indexOf(action) !== -1;
}

function allLoaded() {
  return loaded.length === NUM_TYPES;
}

class SyncStore extends Store {

  get isFetching() {
    return !allLoaded();
  }

  get initialLoadDone() {
    return initialLoadDone;
  }

  get componentsLoaded() {
    return contains(constants.ACTION_NEW_LOADED_COMPONENTS);
  }

  get eventsLoaded() {
    return contains(constants.ACTION_NEW_EVENTS);
  }

  get servicesLoaded() {
    return contains(constants.ACTION_NEW_SERVICES);
  }

  get statesLoaded() {
    return contains(constants.ACTION_NEW_STATES);
  }

}

const INSTANCE = new SyncStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_FETCH_ALL:
      loaded = [];
      INSTANCE.emitChange();
      break;

    case constants.ACTION_NEW_LOADED_COMPONENTS:
    case constants.ACTION_NEW_EVENTS:
    case constants.ACTION_NEW_SERVICES:
    case constants.ACTION_NEW_STATES:
      if (!contains(payload.actionType)) {
        loaded.push(payload.actionType);

        initialLoadDone = initialLoadDone || allLoaded();

        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      initialLoadDone = false;
      loaded = [];
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
