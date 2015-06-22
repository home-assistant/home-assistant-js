import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';
import model from '../../entity/model';

class RecentEntityHistory extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new RecentEntityHistory();

export default INSTANCE;

function entriesLoaded(state, {stateHistory}) {
  return state.withMutations(mState => {
    stateHistory.forEach(
      history => mState.set(
        history[0].entity_id,
        toImmutable(history.map(model.fromJSON))
      )
    )
  });
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
