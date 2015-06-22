import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';

const ALL_ENTRY_FETCH = 'ALL_ENTRY_FETCH';

class RecentEntityHistoryUpdated extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS,
            entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new RecentEntityHistoryUpdated();

export default INSTANCE;

function entriesLoaded(state, {stateHistory}) {
  const now = (new Date()).getTime();

  return state.withMutations(mState => {
    stateHistory.forEach(history => mState.set(history[0].entity_id, now))

    if (history.length > 1) {
      mState.set(ALL_ENTRY_FETCH, now);
    }
  });
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
