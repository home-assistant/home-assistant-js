'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let storage = localStorage;

let PREF_USE_STREAMING = "PREF_USE_STREAMING";
let DEFAULT_USE_STREAMING = true;

let saveValue = function(key, value) {
  storage[key] = JSON.stringify(value);
};

let getValue = function(key, defaultValue) {
  return storage[key] ? JSON.parse(storage[key]) : defaultValue;
};

let preferenceStore = {};
_.assign(preferenceStore, Store.prototype, {

  useStreaming() {
    return getValue(PREF_USE_STREAMING, DEFAULT_USE_STREAMING);
  }

});

preferenceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
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
