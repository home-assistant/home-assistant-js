'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let events = [];

class EventStore extends Store {
  get all() {
    return events;
  }
}

const INSTANCE = new EventStore();

INSTANCE.dispatchToken = dispatcher.register(payload => {
  switch(payload.actionType) {
    case constants.ACTION_NEW_EVENTS:
      events = payload.events;
      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      events = [];
      INSTANCE.emitChange();
      break;
  }
});


export default INSTANCE;
