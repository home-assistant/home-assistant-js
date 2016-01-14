import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

const INSTANCE = new Store({
  getInitialState() {
    return 'states';
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.NAVIGATE, navigate);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function navigate(state, { pane }) {
  return pane;
}

function logOut() {
  return INSTANCE.getInitialState();
}
