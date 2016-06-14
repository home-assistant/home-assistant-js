import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      isListening: false,
      isTransmitting: false,
      interimTranscript: '',
      finalTranscript: '',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.VOICE_START, voiceStart);
    this.on(actionTypes.VOICE_RESULT, voiceResult);
    this.on(actionTypes.VOICE_TRANSMITTING, voiceTransmitting);
    this.on(actionTypes.VOICE_DONE, voiceDone);
    this.on(actionTypes.VOICE_ERROR, voiceError);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function voiceStart(state) {
  return state.set('isListening', true);
}

function voiceResult(state, { interimTranscript, finalTranscript }) {
  return state.withMutations(map =>
    map.set('isListening', true)
       .set('isTransmitting', false)
       .set('interimTranscript', interimTranscript)
       .set('finalTranscript', finalTranscript)
  );
}

function voiceTransmitting(state, { finalTranscript }) {
  return state.withMutations(map =>
    map.set('isListening', false)
       .set('isTransmitting', true)
       .set('interimTranscript', '')
       .set('finalTranscript', finalTranscript)
  );
}

function voiceDone() {
  return INSTANCE.getInitialState();
}

function voiceError() {
  return INSTANCE.getInitialState();
}

function logOut() {
  return INSTANCE.getInitialState();
}
