'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

const STATE_LISTENING = 'STATE_LISTENING';
const STATE_TRANSMITTING = 'STATE_TRANSMITTING';
const STATE_IDLE = 'STATE_IDLE';
const STATE_ERROR = 'STATE_ERROR';

let state = STATE_IDLE;
let interimTranscript = '';
let finalTranscript = '';

class VoiceStore extends Store {

  get state() {
    return state;
  }

  get isListening() {
    return state === STATE_LISTENING;
  }

  get isTransmitting() {
    return state === STATE_TRANSMITTING;
  }

  get hasError() {
    return state === STATE_ERROR;
  }

  get interimTranscript() {
    return interimTranscript;
  }

  get finalTranscript() {
    return finalTranscript;
  }

}

const INSTANCE = new VoiceStore();

INSTANCE.STATE_LISTENING = STATE_LISTENING;
INSTANCE.STATE_TRANSMITTING = STATE_TRANSMITTING;
INSTANCE.STATE_IDLE = STATE_IDLE;
INSTANCE.STATE_ERROR = STATE_ERROR;

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_LISTENING_START:
      state = STATE_LISTENING;
      interimTranscript = '';
      finalTranscript = '';
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LISTENING_TRANSMITTING:
      state = STATE_TRANSMITTING;
      interimTranscript = '';
      finalTranscript = payload.finalTranscript;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LISTENING_DONE:
      state = STATE_IDLE;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LISTENING_ERROR:
      state = STATE_ERROR;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LISTENING_RESULT:
      interimTranscript = payload.interimTranscript;
      finalTranscript = payload.finalTranscript;
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
