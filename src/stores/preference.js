'use strict';

var _ = require('lodash');

var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var storage = localStorage;

// local storage is limited to strings.
var _TRUE_VALUE = "true";
var _FALSE_VALUE = "false";

var PREF_USE_STREAMING = "PREF_USE_STREAMING";
var DEFAULT_USE_STREAMING = true;

var saveBool = function(key, value) {
  storage[key] = value ? _TRUE_VALUE : _FALSE_VALUE;
};

var getBool = function(key, defaultValue) {
  return storage[key] ? storage[key] === _TRUE_VALUE : defaultValue;
};

var preferenceStore = {};
_.assign(preferenceStore, Store.prototype, {

  useStreaming() {
    return getBool(PREF_USE_STREAMING, DEFAULT_USE_STREAMING);
  }

});

preferenceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_STREAM_START:
      saveBool(PREF_USE_STREAMING, true);
      preferenceStore.emitChange();
      break;

    case constants.ACTION_STREAM_STOP:
      saveBool(PREF_USE_STREAMING, false);
      preferenceStore.emitChange();
      break;
  }
});

module.exports = preferenceStore;
