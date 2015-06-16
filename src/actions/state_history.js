import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import State from '../models/state';

function newStateHistory(isFetchAll, stateHistory, date=null) {
  if (isFetchAll || stateHistory.length > 0) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATE_HISTORY,
      date: date,
      stateHistory: stateHistory.map(states => states.map(State.fromJSON)),
      isFetchAll: isFetchAll,
    });
  }
}

export function fetchAll(date=null) {
  let url = 'history/period';

  if (date != null) {
    url += `/${date}`;
  }

  callApi('GET', url).then(
    stateHistory => newStateHistory(true, stateHistory, date));
}

export function fetch(entityId) {
  callApi('GET', `history/period?filter_entity_id=${entityId}`).then(
    stateHistory => newStateHistory(false, stateHistory));
}
