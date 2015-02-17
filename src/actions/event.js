'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var notificationActions = require('./notification');

var eventActions = {
  newEvents(events) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_EVENTS,
      events: events,
    });
  },

  fetchAll() {
    callApi('GET', 'events').then(this.newEvents.bind(this));
  },

  fire(eventType, eventData) {
    eventData = eventData || {};

    return callApi("POST", "events/" + eventType, eventData).then(

      function() {
        notificationActions.notify('Event ' + eventType + ' successful fired!');

        dispatcher.dispatch({
          actionType: constants.ACTION_EVENT_FIRED,
          eventType: eventType,
          eventData: eventData,
        });
      });
  },
};

module.exports = eventActions;
