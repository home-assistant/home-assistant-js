'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var notificationActions = require('./notification');

module.exports = {
  newStates(states, replace) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATES,
      states: states,
      replace: !!replace,
    });
  },

  set(entityId, state, attributes) {
    var payload = {state: state};

    if(attributes) {
      payload.attributes = attributes;
    }

    callApi("POST", "states/" + entityId, payload).then(

      function(newState) {
        notificationActions.notify("State of "+entityId+" set to "+state+".");
        
        this.newStates([newState]);
      }.bind(this));
  },

  fetch(entityId) {
    callApi("GET", "states/" + entityId).then(

      function(newState) {
        this.newStates([newState]);
      }.bind(this));
  },

  fetchAll() {
    callApi("GET", "states").then(

      function(newStates) {
        this.newStates(newStates, true);
      }.bind(this));
  },
};
