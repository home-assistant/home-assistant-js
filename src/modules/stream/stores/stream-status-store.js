import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';
import isSupported from '../is-supported';

class StreamStatusStore extends Store {
  getInitialState() {
    return toImmutable({
      // is streaming supported
      isSupported,
      // if we are streaming
      isStreaming: false,
      // if the user wants us to use streaming
      useStreaming: true,
      // if we have a streaming error
      hasError: false,
    });
  }

  initialize() {
    this.on(actionTypes.STREAM_START, startStream);
    this.on(actionTypes.STREAM_STOP, stopStream);
    this.on(actionTypes.STREAM_ERROR, errorStream);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new StreamStatusStore();

export default INSTANCE;

function startStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', true)
       .set('useStreaming', true)
       .set('hasError', false)
  })
}

function stopStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', false)
       .set('useStreaming', false)
       .set('hasError', false)
  })
}

function errorStream(state) {
  return state.withMutations(map => {
    map.set('isStreaming', false)
       .set('hasError', "true")
  })
}

function logOut() {
  return INSTANCE.getInitialState();
}

