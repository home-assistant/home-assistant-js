'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var toastActions = require('./toast');

var eventActions = {
  newEvents: function(events) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_EVENTS,
      events: events,
    });
  },

  fetchAll: function() {
    callApi('GET', 'events').then(this.newEvents.bind(this));
  },

  fire: function(eventType, eventData) {
    eventData = eventData || {};

    return callApi("POST", "events/" + eventType, eventData).then(

      function() {
        toastActions.show('Event ' + eventType + ' successful fired!');

        dispatcher.dispatch({
          actionType: constants.ACTION_EVENT_FIRED,
          eventType: eventType,
          eventData: eventData,
        });
      });
  },
};

module.exports = eventActions;
