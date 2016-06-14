import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({
      authToken: null,
      host: '',
    });
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.VALID_AUTH_TOKEN, validateSuccess);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function validateSuccess(state, { authToken, host }) {
  return toImmutable({ authToken, host });
}

function logOut() {
  return INSTANCE.getInitialState();
}
