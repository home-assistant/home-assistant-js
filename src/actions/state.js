'use strict';

var _ = require('lodash');
var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var toastActions = require('./toast');
var State = require('../models/state');

module.exports = {
  newStates: function(states, replace) {
    dispatcher.dispatch({
      actionType: actions.ACTION_NEW_STATES,
      states: _.map(states, State.fromJSON),
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
