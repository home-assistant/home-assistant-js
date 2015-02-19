'use strict';

import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import { notify } from './notification';
import { newStates } from './state';

export function newServices(services) {
  if (services.length > 0) {
    dispatcher.dispatch({
      actionType: constants.ACTION_NEW_SERVICES,
      services: services,
    });
  }
}

export function callTurnOn(entity_id) {
  return callService("homeassistant", "turn_on", {entity_id: entity_id});
}

export function callTurnOff(entity_id) {
  return callService("homeassistant", "turn_off", {entity_id: entity_id});
}

export function callService(domain, service, parameters={}) {
  return callApi("POST", "services/" + domain + "/" + service, parameters).then(

    function(changedStates) {
      if(service == "turn_on" && parameters.entity_id) {
        notify("Turned on " + parameters.entity_id + '.');
      } else if(service == "turn_off" && parameters.entity_id) {
        notify("Turned off " + parameters.entity_id + '.');
      } else {
        notify("Service "+domain+"/"+service+" called.");  
      }

      newStates(changedStates);
    }
  );
}

export function fetchAll() {
  return callApi('GET', 'services').then(newServices);
}
