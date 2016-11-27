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
    this.on(actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
    /* eslint-enable no-use-before-define */
  },
});

export default INSTANCE;

function entriesLoaded(state, { stateHistory }) {
  return state.withMutations((mState) => {
    stateHistory.forEach(
      history => mState.set(
        history[0].entity_id,
        toImmutable(history.map(model.fromJSON))
      )
    );
  });
}

function logOut() {
  return INSTANCE.getInitialState();
}
