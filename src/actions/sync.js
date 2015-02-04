'use strict';

var dispatcher = require('../app_dispatcher');

var authStore = require('../stores/auth');

var actions = require('./actions');
var eventActions = require('./event');
var stateActions = require('./state');
var serviceActions = require('./service');
var componentActions = require('./component');

var syncActions = {

  sync: function() {
    eventActions.fetchAll();
    stateActions.fetchAll();
    serviceActions.fetchAll();
    componentActions.fetchAll();
  }

};

var syncInterval = null;

/**
 * See if dispatcher is available to trigger reloads of the data
 * Waits .1 second if unavailable.
 */
var trySync = function() {
  if(dispatcher.isDispatching()) {
    setTimeout(trySync, 100);
  } else {
    syncActions.sync();
  }
};

var scheduleSync = function() {
  clearTimeout(syncInterval);

  syncInterval = setTimeout(trySync, 30000);
};

syncActions.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case actions.ACTION_VALID_AUTH_TOKEN:
      dispatcher.waitFor([authStore.dispatchToken]);

      // components already fetched in validate      
      eventActions.fetchAll();
      stateActions.fetchAll();
      serviceActions.fetchAll();
      break;

    case actions.ACTION_NEW_STATES:
      // If replace == true this is a full sync.
      if (payload.replace) {
        scheduleSync();
      }
      break;

    case actions.ACTION_LOG_OUT:
      clearTimeout(syncInterval);
  }
});

module.exports = syncActions;
