'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let storage = localStorage;

let PREF_AUTH_TOKEN = "PREF_AUTH_TOKEN";
let DEFAULT_AUTH_TOKEN = null;

let PREF_USE_STREAMING = "PREF_USE_STREAMING";
let DEFAULT_USE_STREAMING = true;

let saveValue = function(key, value) {
  storage[key] = JSON.stringify(value);
};

let getValue = function(key, defaultValue) {
  return key in storage ? JSON.parse(storage[key]) : defaultValue;
};

let removeValue = function(key) {
  if (key in storage) {
    storage.removeItem(key);
    return true;
  }
  return false;
};

let preferenceStore = {};
_.assign(preferenceStore, Store.prototype, {

  useStreaming() {
    return getValue(PREF_USE_STREAMING, DEFAULT_USE_STREAMING);
  },

  hasAuthToken() {
    return preferenceStore.getAuthToken() !== null;
  },

  getAuthToken() {
    return getValue(PREF_AUTH_TOKEN, DEFAULT_AUTH_TOKEN);
  },

});

preferenceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_VALID_AUTH_TOKEN:
      if (payload.rememberLogin) {
        saveValue(PREF_AUTH_TOKEN, payload.authToken);
        preferenceStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      if (removeValue(PREF_AUTH_TOKEN)) {
        preferenceStore.emitChange();
      }
      break;

    case constants.ACTION_STREAM_START:
      saveValue(PREF_USE_STREAMING, true);
      preferenceStore.emitChange();
      break;

    case constants.ACTION_STREAM_STOP:
      saveValue(PREF_USE_STREAMING, false);
      preferenceStore.emitChange();
      break;
  }
});

export default preferenceStore;
