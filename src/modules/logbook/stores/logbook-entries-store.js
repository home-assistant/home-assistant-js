import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';
import model from '../model';

class LogbookEntryStore extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  }
}

const INSTANCE = new LogbookEntryStore();

export default INSTANCE;

function entriesLoaded(state, {date, entries}) {
  return state.set(date, toImmutable(entries.map(model.fromJSON)));
}

function logOut() {
  return INSTANCE.getInitialState();
}
