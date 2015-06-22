import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class CurrentStore extends Store {
  getInitialState() {
    return toImmutable({
      authToken: null,
      host: '',
    });
  }

  initialize() {
    this.on(actionTypes.VALID_AUTH_TOKEN, validateSuccess);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new CurrentStore();

export default INSTANCE;

function validateSuccess(state, {authToken, host}) {
  return toImmutable({authToken, host});
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
