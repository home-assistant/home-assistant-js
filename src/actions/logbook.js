import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';

function newLogbookEntries(date, logbookEntries) {
  dispatcher.dispatch({
    actionType: constants.ACTION_NEW_LOGBOOK,
    date: date,
    logbookEntries: logbookEntries,
  });
}

export function fetch(date=null) {
  let url = 'logbook'

  if (date != null) {
    url += `/${date}`
  }

  callApi('GET', url).then(
    logbookEntries => newLogbookEntries(date, logbookEntries));
}
