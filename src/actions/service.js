'use strict';

var callApi = require('../call_api');
var dispatcher = require('../app_dispatcher');
var constants = require('../constants');
var notificationActions = require('./notification');
var stateActions = require('./state');

module.exports = {
  newServices(services) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_SERVICES,
      services: services,
    });
  },

  callTurnOn(entity_id) {
    return this.callService(
      "homeassistant", "turn_on", {entity_id: entity_id});
  },

  callTurnOff(entity_id) {
    return this.callService(
      "homeassistant", "turn_off", {entity_id: entity_id});
  },

  callService(domain, service, parameters) {
    parameters = parameters || {};

    return callApi(
      "POST", "services/" + domain + "/" + service, parameters).then(

      function(changedStates) {
        if(service == "turn_on" && parameters.entity_id) {
          notificationActions.notify("Turned on " + parameters.entity_id + '.');
        } else if(service == "turn_off" && parameters.entity_id) {
          notificationActions.notify("Turned off " + parameters.entity_id + '.');
        } else {
          notificationActions.notify("Service "+domain+"/"+service+" called.");  
        }

        if(changedStates.length > 0) {
          stateActions.newStates(changedStates);
        }
      });
  },

  fetchAll() {
    return callApi('GET', 'services').then(this.newServices.bind(this));
  },
};
