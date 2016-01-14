import { callApi } from '../api';
import { createApiActions } from '../rest-api';
import { actions as entityActions } from '../entity';
import { actions as notificationActions } from '../notification';
import * as getters from './getters';
import model from './model';

const serviceApiActions = createApiActions(model);

serviceApiActions.serviceRegistered = function serviceRegistered(reactor, domain, service) {
  let serviceDomain = reactor.evaluateToJS(getters.byDomain(domain));

  if (serviceDomain) {
    serviceDomain.services.push(service);
  } else {
    serviceDomain = {
      domain,
      services: [service],
    };
  }

  serviceApiActions.incrementData(reactor, serviceDomain);
};

serviceApiActions.callTurnOn = function callTurnOn(reactor, entityId, params = {}) {
  return serviceApiActions.callService(
    reactor, 'homeassistant', 'turn_on', { ...params, entity_id: entityId });
};

serviceApiActions.callTurnOff = function callTurnOff(reactor, entityId, params = {}) {
  return serviceApiActions.callService(
    reactor, 'homeassistant', 'turn_off', { ...params, entity_id: entityId });
};

serviceApiActions.callService = function callService(reactor, domain, service, params = {}) {
  return callApi(reactor, 'POST', `services/${domain}/${service}`, params).then(
    (states) => {
      if (service === 'turn_on' && params.entity_id) {
        notificationActions.createNotification(
          reactor, `Turned on ${params.entity_id}.`);
      } else if (service === 'turn_off' && params.entity_id) {
        notificationActions.createNotification(
          reactor, `Turned off ${params.entity_id}.`);
      } else {
        notificationActions.createNotification(
          reactor, `Service ${domain}/${service} called.`);
      }

      entityActions.incrementData(reactor, states);
    }
  );
};

module.exports = serviceApiActions;
