import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';
import model from '../model';

class LogbookEntriesUpdatedStore extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new LogbookEntriesUpdatedStore();

export default INSTANCE;

function entriesLoaded(state, {date}) {
  return state.set(date, new Date().getTime());
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
