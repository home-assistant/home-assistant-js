'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var actions = require('../actions/actions');
var toastActions = require('./toast');
var stateActions = require('./state');

module.exports = {
  newServices: function(services) {
    dispatcher.dispatch({
      actionType: actions.ACTION_NEW_SERVICES,
      services: services,
    });
  },

  callTurnOn: function(entity_id) {
    return this.callService(
      "homeassistant", "turn_on", {entity_id: entity_id});
  },

  callTurnOff: function(entity_id) {
    return this.callService(
      "homeassistant", "turn_off", {entity_id: entity_id});
  },

  callService: function(domain, service, parameters) {
    parameters = parameters || {};

    return callApi(
      "POST", "services/" + domain + "/" + service, parameters).then(

      function(changedStates) {
        if(service == "turn_on" && parameters.entity_id) {
          toastActions.show("Turned on " + parameters.entity_id + '.');
        } else if(service == "turn_off" && parameters.entity_id) {
          toastActions.show("Turned off " + parameters.entity_id + '.');
        } else {
          toastActions.show("Service "+domain+"/"+service+" called.");  
        }

        if(changedStates.length > 0) {
          stateActions.newStates(changedStates);
        }
      });
  },

  fetchAll: function() {
    return callApi('GET', 'services').then(this.newServices.bind(this));
  },
};
