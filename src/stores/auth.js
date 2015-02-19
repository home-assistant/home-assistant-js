'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

let isValidating = false;
let isLoggedIn = false;
let authToken = '';
let lastAttemptInvalid = false;
let lastAttemptMessage = '';

var authStore = {};
_.assign(authStore, Store.prototype, {
  isValidating() {
    return isValidating;
  },

  isLoggedIn() {
    return isLoggedIn;
  },

  getAuthToken() {
    return authToken;
  },

  wasLastAttemptInvalid() {
    return lastAttemptInvalid;
  },

  getLastAttemptMessage() {
    return lastAttemptMessage;
  },

});

authStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_VALIDATING_AUTH_TOKEN:
      isValidating = true;

      authStore.emitChange();
      break;

    case constants.ACTION_VALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = true;
      authToken = payload.authToken;
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      authStore.emitChange();
      break;

    case constants.ACTION_INVALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = true;
      lastAttemptMessage = payload.message || 'Unexpected result from API';

      authStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      authStore.emitChange();
      break;
  }
});

export default authStore;
