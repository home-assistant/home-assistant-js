import nuclearJS from 'nuclear-js';
import actionTypes from '../action-types';
import model from '../../entity/model';

const { Store, toImmutable } = nuclearJS;

const INSTANCE = new Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    /* eslint-disable no-use-before-define */
    this.on(actionTypes.ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function entriesLoaded(state, { date, stateHistory }) {
  // set an empty map to indicate that data was loaded
  if (stateHistory.length === 0) {
    return state.set(date, toImmutable({}));
  }

  return state.withMutations(mState => {
    stateHistory.forEach(
      history => mState.setIn(
        [date, history[0].entity_id],
        toImmutable(history.map(model.fromJSON))
      )
    );
  });
}

function logOut() {
  return INSTANCE.getInitialState();
}
