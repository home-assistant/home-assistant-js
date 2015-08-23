import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class SelectedNavigationPane extends Store {
  getInitialState() {
    return 'states';
  }

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.NAVIGATE, navigate);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  }
}

const INSTANCE = new SelectedNavigationPane();

export default INSTANCE;

function navigate(state, {pane}) {
  return pane;
}

function logOut() {
  return INSTANCE.getInitialState();
}
