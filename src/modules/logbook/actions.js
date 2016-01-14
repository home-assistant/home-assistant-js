import { callApi } from '../api';
import actionTypes from './action-types';

export function changeCurrentDate(reactor, date) {
  reactor.dispatch(actionTypes.LOGBOOK_DATE_SELECTED, { date });
}

export function fetchDate(reactor, date) {
  reactor.dispatch(actionTypes.LOGBOOK_ENTRIES_FETCH_START, { date });

  callApi(reactor, 'GET', `logbook/${date}`).then(
    entries => reactor.dispatch(
      actionTypes.LOGBOOK_ENTRIES_FETCH_SUCCESS, { date, entries }),

    () => reactor.dispatch(actionTypes.LOGBOOK_ENTRIES_FETCH_ERROR, {})
  );
}
