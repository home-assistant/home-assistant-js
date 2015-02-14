'use strict';

var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var syncActions = require('./sync');

var source = null;

// There is a bug in Chrome that when the computer goes in standby the
// eventsource is closed but the close listener is not called. 
var CHECK_INTERVAL = 1000;

var _scheduledCheck = null;

var stopCheckSchedule = function() {
  clearTimeout(_scheduledCheck);
};

var scheduleCheck = function() {
  stopCheckSchedule();

  if (source !== null && source.readyState === EventSource.CLOSED) {
    source = null;
    eventActions.start();
  }

  _scheduledCheck = setTimeout(scheduleCheck, CHECK_INTERVAL);
};

var eventActions = {
  start: function(authToken) {
    if (source !== null) {
      return;
    }

    var url = '/api/stream';

    if (authToken) {
      url += '?api_password=' + authToken;
    }

    source = new EventSource(url);

    source.addEventListener('message', function(ev) {
      dispatcher.dispatch({
        actionType: constants.ACTION_REMOTE_EVENT_RECEIVED,
        event: JSON.parse(ev.data),
      });
    }, false);

    source.addEventListener('open', function() {
      dispatcher.dispatch({
        actionType: constants.ACTION_STREAM_START,
      });

      scheduleCheck();

      // We are streaming, stop synchronizing
      syncActions.stopSync();
      // make sure that we have the latest info when we start listening.
      syncActions.fetchAll();
    }, false);

    source.addEventListener('error', function(ev) {
      stopCheckSchedule();

      if (ev.readyState == EventSource.CLOSED) {
        eventActions.stopListening();
      } else {
        dispatcher.dispatch({
          actionType: constants.ACTION_STREAM_ERROR,
        });
      }
    }, false);

  },

  stop: function() {
    source.close();
    source = null;

    dispatcher.dispatch({
      actionType: constants.ACTION_STREAM_STOP,
    });

    syncActions.sync();
  },
};

module.exports = eventActions;
