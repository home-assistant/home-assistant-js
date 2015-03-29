'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';

function newLogbookEntries(logbookEntries) {
  dispatcher.dispatch({
    actionType: constants.ACTION_NEW_LOGBOOK,
    logbookEntries: logbookEntries,
  });
}

export function fetch() {
  callApi('GET', 'logbook').then(newLogbookEntries);
}
