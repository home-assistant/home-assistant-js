'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var Store = require('../stores/store');

var connectionStore = {};
_.assign(connectionStore, Store.prototype, {
  STATE_CONNECTED: 'STATE_CONNECTED',
  STATE_DISCONNECTED: 'STATE_DISCONNECTED',
  STATE_ERROR: 'STATE_ERROR',

  getState: function() {
    return state;
  },

  isStreaming: function() {
    return state === connectionStore.STATE_CONNECTED;
  },

  hasError: function() {
    return state === connectionStore.STATE_ERROR;
  },
});

var state = connectionStore.STATE_DISCONNECTED;

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

module.exports = connectionStore;
