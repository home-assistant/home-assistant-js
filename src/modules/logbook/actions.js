import Flux from '../../flux';
import callApi from '../../call_api';
import actionTypes from './action-types';

export function changeCurrentDate(date) {
  Flux.dispatch(actionTypes.LOGBOOK_DATE_SELECTED, {date})
}

export function fetchDate(date) {
  Flux.dispatch(actionTypes.LOGBOOK_ENTRIES_FETCH_START, {date})

  callApi('GET', `logbook/${date}`).then(
    entries => Flux.dispatch(
      actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, {date, entries}),

    () => Flux.dispatch(actionTypes.LOGBOOK_ENTRIES_FETCH_ERROR, {})
  );
}
