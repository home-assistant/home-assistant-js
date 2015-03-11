'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';

let isValidating = false;
let isLoggedIn = false;
let authToken = '';
let lastAttemptInvalid = false;
let lastAttemptMessage = '';

class AuthStore extends Store {
  get isValidating() {
    return isValidating;
  }

  get isLoggedIn() {
    return isLoggedIn;
  }

  get authToken() {
    return authToken;
  }

  get lastAttemptInvalid() {
    return lastAttemptInvalid;
  }

  get lastAttemptMessage() {
    return lastAttemptMessage;
  }  
}

const INSTANCE = new AuthStore();

INSTANCE.dispatchToken = dispatcher.register(payload => {
  switch(payload.actionType) {
    case constants.ACTION_VALIDATING_AUTH_TOKEN:
      isValidating = true;

      INSTANCE.emitChange();
      break;

    case constants.ACTION_VALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = true;
      authToken = payload.authToken;
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      INSTANCE.emitChange();
      break;

    case constants.ACTION_INVALID_AUTH_TOKEN:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = true;
      lastAttemptMessage = payload.message || 'Unexpected result from API';

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      isValidating = false;
      isLoggedIn = false;
      authToken = '';
      lastAttemptInvalid = false;
      lastAttemptMessage = '';

      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;