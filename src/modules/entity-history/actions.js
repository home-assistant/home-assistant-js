import Flux from '../../flux';
import { callApi } from '../api';
import actionTypes from './action-types';
import * as getters from './getters';

export function changeCurrentDate(date) {
  Flux.dispatch(actionTypes.ENTITY_HISTORY_DATE_SELECTED, {date})
}

export function fetchRecent(entityId = null) {
  Flux.dispatch(actionTypes.RECENT_ENTITY_HISTORY_FETCH_START, {})

  let url = 'history/period';

  if (entityId !== null) {
    url += `?filter_entity_id=${entityId}`;
  }

  return callApi('GET', url).then(
    stateHistory => Flux.dispatch(
      actionTypes.RECENT_ENTITY_HISTORY_FETCH_SUCCESS, {stateHistory}),

    () => Flux.dispatch(actionTypes.RECENT_ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

export function fetchDate(date) {
  Flux.dispatch(actionTypes.ENTITY_HISTORY_FETCH_START, {date})

  return callApi('GET', `history/period/${date}`).then(
    stateHistory => Flux.dispatch(
      actionTypes.ENTITY_HISTORY_FETCH_SUCCESS, {date, stateHistory}),

    () => Flux.dispatch(actionTypes.ENTITY_HISTORY_FETCH_ERROR, {})
  );
}

export function fetchSelectedDate() {
  const date = Flux.evaluate(getters.currentDate);

  return fetchDate(date);
}
