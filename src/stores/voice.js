'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let interimTranscript = '';
let finalTranscript = '';

let voiceStore = {};
_.assign(voiceStore, Store.prototype, {
  STATE_LISTENING: 'STATE_LISTENING',
  STATE_TRANSMITTING: 'STATE_TRANSMITTING',
  STATE_IDLE: 'STATE_IDLE',
  STATE_ERROR: 'STATE_ERROR',

  getState() {
    return state;
  },

  isListening() {
    return state === voiceStore.STATE_LISTENING;
  },

  isTransmitting() {
    return state === voiceStore.STATE_TRANSMITTING;
  },

  hasError() {
    return state === voiceStore.STATE_ERROR;
  },

  getInterimTranscript() {
    return interimTranscript;
  },

  getFinalTranscript() {
    return finalTranscript;
  },

});

let state = voiceStore.STATE_IDLE;

voiceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_LISTENING_START:
      state = voiceStore.STATE_LISTENING;
      interimTranscript = '';
      finalTranscript = '';
      voiceStore.emitChange();
      break;

    case constants.ACTION_LISTENING_TRANSMITTING:
      state = voiceStore.STATE_TRANSMITTING;
      interimTranscript = '';
      finalTranscript = payload.finalTranscript;
      voiceStore.emitChange();
      break;

    case constants.ACTION_LISTENING_DONE:
      state = voiceStore.STATE_IDLE;
      voiceStore.emitChange();
      break;

    case constants.ACTION_LISTENING_ERROR:
      state = voiceStore.STATE_ERROR;
      voiceStore.emitChange();
      break;

    case constants.ACTION_LISTENING_RESULT:
      interimTranscript = payload.interimTranscript;
      finalTranscript = payload.finalTranscript;
      voiceStore.emitChange();
      break;
  }
});

export default voiceStore;
