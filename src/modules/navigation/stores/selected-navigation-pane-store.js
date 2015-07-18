import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

class SelectedNavigationPane extends Store {
  getInitialState() {
    return toImmutable({
      pane: 'states',
      filter: null,
    });
  }

  initialize() {
    this.on(actionTypes.NAVIGATE, navigate);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new SelectedNavigationPane();

export default INSTANCE;

function navigate(state, {pane, filter=null}) {
  return state.withMutations(
    map => map.set('pane', pane).set('filter', filter))
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
