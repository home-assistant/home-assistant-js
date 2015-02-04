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

syncActions.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case actions.ACTION_VALID_AUTH_TOKEN:
      dispatcher.waitFor([authStore.dispatchToken]);

      // components already fetched in validate      
      eventActions.fetchAll();
      stateActions.fetchAll();
      serviceActions.fetchAll();
      break;
  }
});

module.exports = syncActions;
