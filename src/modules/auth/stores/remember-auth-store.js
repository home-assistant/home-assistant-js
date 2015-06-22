import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class CurrentStore extends Store {
  getInitialState() {
    return true;
  }

  initialize() {
    this.on(actionTypes.VALID_AUTH_TOKEN, storeRememberAuth);
  }
}

const INSTANCE = new CurrentStore();

export default INSTANCE;

function storeRememberAuth(state, {rememberAuth}) {
  return rememberAuth;
}
