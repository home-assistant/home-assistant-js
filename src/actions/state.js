'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var toastActions = require('./toast');

module.exports = {
  newStates: function(states, replace) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_STATES,
      states: states,
      replace: !!replace,
    });
  },

  set: function(entityId, state, attributes) {
    var payload = {state: state};

    if(attributes) {
      payload.attributes = attributes;
    }

    callApi("POST", "states/" + entityId, payload).then(

      function(newState) {
        toastActions.show("State of "+entityId+" set to "+state+".");
        
        this.newStates([newState]);
      }.bind(this));
  },

  fetch: function(entityId) {
    callApi("GET", "states/" + entityId).then(

      function(newState) {
        this.newStates([newState]);
      }.bind(this));
  },

  fetchAll: function() {
    callApi("GET", "states").then(

      function(newStates) {
        this.newStates(newStates, true);
      }.bind(this));
  },
};
