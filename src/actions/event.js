'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import { notify } from './notification';

export function newEvents(events) {
  dispatcher.dispatch({
    actionType: constants.ACTION_NEW_EVENTS,
    events: events,
  });
}

export function fetchAll() {
  callApi('GET', 'events').then(newEvents);
}

export function fire(eventType, eventData={}) {
  return callApi("POST", "events/" + eventType, eventData).then(
    function() {
      notify('Event ' + eventType + ' successful fired!');

      dispatcher.dispatch({
        actionType: constants.ACTION_EVENT_FIRED,
        eventType: eventType,
        eventData: eventData,
      });
    }
  );
}
