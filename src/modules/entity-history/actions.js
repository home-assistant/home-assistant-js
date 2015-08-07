import { callApi } from '../api';
import actionTypes from './action-types';
import * as getters from './getters';

export function changeCurrentDate(reactor, date) {
  reactor.dispatch(actionTypes.ENTITY_HISTORY_DATE_SELECTED, {date})
}

export function fetchRecent(reactor, entityId = null) {
  reactor.dispatch(actionTypes.RECENT_ENTITY_HISTORY_FETCH_START, {})

  let url = 'history/period';

  if (entityId !== null) {
    url += `?filter_entity_id=${entityId}`;
  }

  return callApi(reactor, 'GET', url).then(
    stateHistory => reactor.dispatch(
      actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, {stateHistory}),

    () => reactor.dispatch(actionTypes.RECENT_ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

export function fetchDate(reactor, date) {
  reactor.dispatch(actionTypes.ENTITY_HISTORY_FETCH_START, {date})

  return callApi(reactor, 'GET', `history/period/${date}`).then(
    stateHistory => reactor.dispatch(
      actionTypes.ENTITY_HISTORY_FETCH_SUCCESS, {date, stateHistory}),

    () => reactor.dispatch(actionTypes.ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

export function fetchSelectedDate(reactor) {
  const date = reactor.evaluate(getters.currentDate);

  return fetchDate(reactor, date);
}
