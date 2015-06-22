import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class IsFetchingStore extends Store {
  getInitialState() {
    return toImmutable({
      isListening: false,
      isTransmitting: false,
      interimTranscript: '',
      finalTranscript: '',
    });
  }

  initialize() {
    this.on(actionTypes.VOICE_START, voiceStart);
    this.on(actionTypes.VOICE_RESULT, voiceResult);
    this.on(actionTypes.VOICE_TRANSMITTING, voiceTransmitting);
    this.on(actionTypes.VOICE_DONE, voiceDone);
    this.on(actionTypes.VOICE_ERROR, voiceError);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new IsFetchingStore();

export default INSTANCE;

function voiceStart(state) {
  return state.set('isListening', true);
}

function voiceResult(state, {interimTranscript, finalTranscript}) {
  return toImmutable({
      finalTranscript,
      interimTranscript,
      isListening: true,
      isTransmitting: false,
  });
}

function voiceTransmitting(state, {finalTranscript}) {
  return toImmutable({
    finalTranscript,
    isListening: false,
    isTransmitting: false,
    interimTranscript: '',
  });
}

function voiceDone() {
  return INSTANCE.getInitialState();
}

function voiceError(state) {
  return INSTANCE.getInitialState();
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
