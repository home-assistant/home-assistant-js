import { Map, List } from 'immutable';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let services = new Map();

class ServiceStore extends Store {

  get all() {
    return services;
  }

  has(domain, service) {
    let domainServices = services.get(domain);

    return domainServices && domainServices.contains(service);
  }

  getServices(domain) {
    return services.get(domain) || new List();
  }

}

const INSTANCE = new ServiceStore();

INSTANCE.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_SERVICES:
      services = (new Map()).withMutations((map) => {
        payload.services.forEach((domainObj) => {
          map.set(domainObj.domain, new List(domainObj.services));
        });
      });

      INSTANCE.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type !== constants.REMOTE_EVENT_SERVICE_REGISTERED) {
        break;
      }

      let { domain, service } = payload.event.data;

      if (INSTANCE.has(domain, service)) {
        break;
      }

      let curServices = INSTANCE.getServices(domain);

      services = services.set(domain, curServices.push(service));

      INSTANCE.emitChange();
      break;

    case constants.ACTION_LOG_OUT:
      services = new Map();
      INSTANCE.emitChange();
      break;
  }
});

export default INSTANCE;
