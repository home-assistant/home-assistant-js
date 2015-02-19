'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let events = [];

let eventStore = {};
_.assign(eventStore, Store.prototype, {
  all() {
    return events;
  },

});

eventStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_EVENTS:
      events = payload.events;
      eventStore.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      events = [];
      eventStore.emitChange();
      break;
  }
});


export default eventStore;
