import { Store } from 'nuclear-js';
import actionTypes from '../action-types';

class IsLoadingLogbookEntries extends Store {
  getInitialState() {
    return false;
  }

  initialize() {
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_START, () => true);
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, () => false);
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_ERROR, () => false);
    this.on(actionTypes.LOG_OUT, () => false);
  }
}

const INSTANCE = new IsLoadingLogbookEntries();

export default INSTANCE;
