import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

const STATE_CONNECTED = 'STATE_CONNECTED';
const STATE_DISCONNECTED = 'STATE_DISCONNECTED';
const STATE_ERROR = 'STATE_ERROR';

let state = STATE_DISCONNECTED;

class ConnectionStore extends Store {

  get state() {
    return state;
  }

  get isStreaming() {
    return state === this.STATE_CONNECTED;
  }

  get hasError() {
    return state === this.STATE_ERROR;
  }

}

const INSTANCE = new ConnectionStore();

INSTANCE.STATE_CONNECTED = STATE_CONNECTED;
INSTANCE.STATE_DISCONNECTED = STATE_DISCONNECTED;
INSTANCE.STATE_ERROR = STATE_ERROR;

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_STREAM_START:
      state = STATE_CONNECTED;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_STREAM_STOP:
      state = STATE_DISCONNECTED;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_STREAM_ERROR:
      state = STATE_ERROR;
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
