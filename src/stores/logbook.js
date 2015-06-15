import { List } from 'immutable';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from '../stores/store';
import LogbookEntry from '../models/logbook_entry';

// Consider data stale if not fetched in last minute
const STALE_TIME = 60000;

let _lastUpdated = null;
let _date = null;
let _logbook = new List();

class HumanLogStore extends Store {

  shouldFetch(date=null) {
    return date != _date || _lastUpdated === null ||
           (new Date()).getTime() - _lastUpdated.getTime() > STALE_TIME;
  }

  get all() {
    return _logbook;
  }
}

const INSTANCE = new HumanLogStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_LOGBOOK:
      _date = payload.date;
      _logbook = new List(
        payload.logbookEntries.map(
          entry => LogbookEntry.fromJSON(entry)));

      _lastUpdated = new Date();

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      _date = null;
      _lastUpdated = null;
      _logbook = new List();
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
