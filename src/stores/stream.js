'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let connectionStore = {};
_.assign(connectionStore, Store.prototype, {
  STATE_CONNECTED: 'STATE_CONNECTED',
  STATE_DISCONNECTED: 'STATE_DISCONNECTED',
  STATE_ERROR: 'STATE_ERROR',

  getState() {
    return state;
  },

  isStreaming() {
    return state === connectionStore.STATE_CONNECTED;
  },

  hasError() {
    return state === connectionStore.STATE_ERROR;
  },
});

let state = connectionStore.STATE_DISCONNECTED;

connectionStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_STREAM_START:
      state = connectionStore.STATE_CONNECTED;
      connectionStore.emitChange();
      break;

    case constants.ACTION_STREAM_STOP:
      state = connectionStore.STATE_DISCONNECTED;
      connectionStore.emitChange();
      break;

    case constants.ACTION_STREAM_ERROR:
      state = connectionStore.STATE_ERROR;
      connectionStore.emitChange();
      break;
  }
});

export default connectionStore;
