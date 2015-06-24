import Flux from '../../flux';
import callApi from '../../call-api';
import { createApiActions } from '../rest-api';
import { actions as entityActions } from '../entity';
import { actions as notificationActions } from '../notification';
import * as getters from './getters';
import model from './model';

const serviceApiActions = createApiActions(model);

serviceApiActions.serviceRegistered = function serviceRegistered(domain, service) {
  let serviceDomain = Flux.evaluateToJS(getters.byDomain(domain));

  if (serviceDomain) {
    serviceDomain.services.push(service);
  } else {
    serviceDomain = {
      domain,
      services: [service],
    }
  }

  serviceApiActions.incrementData(serviceDomain);
}

serviceApiActions.callTurnOn = function callTurnOn(entity_id, params = {}) {
  return serviceApiActions.callService(
    'homeassistant', 'turn_on', {...params, entity_id: entity_id});
}

serviceApiActions.callTurnOff = function callTurnOff(entity_id, params = {}) {
  return serviceApiActions.callService(
    'homeassistant', 'turn_off', {...params, entity_id: entity_id});
}

serviceApiActions.callService = function callService(domain, service, params = {}) {
  return callApi('POST', `services/${domain}/${service}`, params).then(
    (states) => {
      if(service == 'turn_on' && params.entity_id) {
        notificationActions.createNotification(
          `Turned on ${params.entity_id}.`);
      } else if(service == 'turn_off' && params.entity_id) {
        notificationActions.createNotification(
          `Turned off ${params.entity_id}.`);
      } else {
        notificationActions.createNotification(
          `Service ${domain}/${service} called.`);
      }

      entityActions.incrementData(states)
    }
  );
}

module.exports = serviceApiActions;
