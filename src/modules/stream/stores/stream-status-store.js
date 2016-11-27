import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      // if we are streaming
      isStreaming: false,
      // if we have a streaming error
      hasError: false,
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.STREAM_START, startStream);
    this.on(actionTypes.STREAM_ERROR, errorStream);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function startStream(state) {
  return state.withMutations((map) => {
    map
      .set('isStreaming', true)
      .set('hasError', false);
  });
}

function errorStream(state) {
  return state.withMutations((map) => {
    map
      .set('isStreaming', false)
      .set('hasError', true);
  });
}

function logOut() {
  return INSTANCE.getInitialState();
}
