import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function entriesLoaded(state, {date}) {
  return state.set(date, new Date().getTime());
}

function logOut() {
  return INSTANCE.getInitialState();
}
