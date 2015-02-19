'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import State from '../models/state';

export function newStateHistory(isFetchAll, stateHistory) {
  if (isFetchAll || stateHistory.length > 0) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATE_HISTORY,
      stateHistory: stateHistory.map(states => states.map(State.fromJSON)),
      isFetchAll: isFetchAll,
    });
  }
}

export function fetchAll() {
  callApi('GET', 'history/period').then(newStateHistory.bind(null, true));
}

export function fetch(entityId) {
  callApi('GET', 'history/period?filter_entity_id=' + entityId).then(
    this.newStateHistory.bind(null, false));
}
