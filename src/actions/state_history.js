'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import State from '../models/state';

function newStateHistory(isFetchAll, stateHistory) {
  if (isFetchAll || stateHistory.length > 0) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATE_HISTORY,
      stateHistory: stateHistory.map(states => states.map(State.fromJSON)),
      isFetchAll: isFetchAll,
    });
  }
}

export function fetchAll() {
  callApi('GET', 'history/period').then(
    stateHistory => newStateHistory(true, stateHistory));
}

export function fetch(entityId) {
  callApi('GET', 'history/period?filter_entity_id=' + entityId).then(
    stateHistory => newStateHistory(false, stateHistory));
}
