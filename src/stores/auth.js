'use strict';

var _ = require('lodash');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var Store = require('../stores/store');

var isValidating = false;
var isLoggedIn = false;
var authToken = '';
var lastAttemptInvalid = false;
var lastAttemptMessage = '';

var authStore = {};
_.assign(authStore, Store.prototype, {
  isValidating: function() {
    return isValidating;
  },

  isLoggedIn: function() {
    return isLoggedIn;
  },

  getAuthToken: function() {
    return authToken;
  },

  wasLastAttemptInvalid: function() {
    return lastAttemptInvalid;
  },

  getLastAttemptMessage: function() {
    return lastAttemptMessage;
  },

});

authStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case actions.ACTION_VALIDATING_AUTH_TOKEN:
      isValidating = true;

      authStore.emitChange();
      break;

    case actions.ACTION_VALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = true;
      authToken = payload.authToken;
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      authStore.emitChange();
      break;

    case actions.ACTION_INVALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = true;
      lastAttemptMessage = payload.message || 'Unexpected result from API';

      authStore.emitChange();
      break;

    case actions.ACTION_LOG_OUT:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      authStore.emitChange();
      break;
  }
});

module.exports = authStore;
