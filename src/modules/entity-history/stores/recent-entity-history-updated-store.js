import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';

const { Store, toImmutable } = nuclearJS;
const ALL_ENTRY_FETCH = 'ALL_ENTRY_FETCH';

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS,
            entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function entriesLoaded(state, { stateHistory }) {
  const now = (new Date()).getTime();

  return state.withMutations(mState => {
    stateHistory.forEach(history => mState.set(history[0].entity_id, now));

    if (history.length > 1) {
      mState.set(ALL_ENTRY_FETCH, now);
    }
  });
}

function logOut() {
  return INSTANCE.getInitialState();
}
