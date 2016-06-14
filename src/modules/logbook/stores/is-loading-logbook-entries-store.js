import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return false;
  },

  initialize() {
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_START, () => true);
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, () => false);
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_ERROR, () => false);
    this.on(actionTypes.LOG_OUT, () => false);
  },
});

export default INSTANCE;
