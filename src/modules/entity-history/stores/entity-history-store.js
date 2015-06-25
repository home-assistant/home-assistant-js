import { Store, toImmutable } from 'nuclear-js';
import actionTypes from '../action-types';
import model from '../../entity/model';

class EntityHistory extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(actionTypes.ENTITY_HISTORY_FETCH_SUCCESS, entriesLoaded);
    this.on(actionTypes.LOG_OUT, logOut);
  }
}

const INSTANCE = new EntityHistory();

export default INSTANCE;

function entriesLoaded(state, {date, stateHistory}) {
  // set an empty map to indicate that data was loaded
  if (stateHistory.length == 0) {
    return state.set(date, toImmutable({}));
  }

  return state.withMutations(mState => {
    stateHistory.forEach(
      history => mState.setIn(
        [date, history[0].entity_id],
        toImmutable(history.map(model.fromJSON))
      )
    )
  });
}

function logOut(state) {
  return INSTANCE.getInitialState();
}
