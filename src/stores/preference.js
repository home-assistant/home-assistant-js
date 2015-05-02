import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

try {
  var storage = localStorage;
} catch(err) {
  var storage = {};
}

const PREF_AUTH_TOKEN = "PREF_AUTH_TOKEN";
const DEFAULT_AUTH_TOKEN = null;

const PREF_USE_STREAMING = "PREF_USE_STREAMING";
const DEFAULT_USE_STREAMING = true;

function saveValue(key, value) {
  storage[key] = JSON.stringify(value);
}

function getValue(key, defaultValue) {
  return key in storage ? JSON.parse(storage[key]) : defaultValue;
}

function removeValue(key) {
  if (key in storage) {
    storage.removeItem(key);
    return true;
  }
  return false;
}

class PreferenceStore extends Store {

  get useStreaming() {
    return getValue(PREF_USE_STREAMING, DEFAULT_USE_STREAMING);
  }

  get hasAuthToken() {
    return this.authToken !== null;
  }

  get authToken() {
    return getValue(PREF_AUTH_TOKEN, DEFAULT_AUTH_TOKEN);
  }

}

const INSTANCE = new PreferenceStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_VALID_AUTH_TOKEN:
      if (payload.rememberLogin) {
        saveValue(PREF_AUTH_TOKEN, payload.authToken);
        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      if (removeValue(PREF_AUTH_TOKEN)) {
        INSTANCE.emitChange();
      }
      break;

    case constants.ACTION_STREAM_START:
      saveValue(PREF_USE_STREAMING, true);
      INSTANCE.emitChange();
      break;

    case constants.ACTION_STREAM_STOP:
      saveValue(PREF_USE_STREAMING, false);
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
