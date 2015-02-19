'use strict';

import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import Store from './store';

let services = [];

let _getDomain = function(domain) {
  return _.find(services, function(service) { return service.domain === domain; });
};

let serviceStore = {};
_.assign(serviceStore, Store.prototype, {
  all() {
    return services;
  },

  has(domain, service) {
    let domainObj = _getDomain(domain);

    return domainObj && domainObj.services.indexOf(service) !== -1;
  },

});

serviceStore.dispatchToken = dispatcher.register(function(payload) {
  switch(payload.actionType) {
    case constants.ACTION_NEW_SERVICES:
      services = payload.services;
      serviceStore.emitChange();
      break;

    case constants.ACTION_REMOTE_EVENT_RECEIVED:
      if (payload.event.event_type === constants.REMOTE_EVENT_SERVICE_REGISTERED) {
        let data = payload.event.data;

        let domainObj = _getDomain(data.domain);

        if (domainObj) {
          domainObj.services.push(data.service);
        } else {
          services.push({domain: data.domain, services: [data.service]});
        }

        serviceStore.emitChange();
      }
      break;

    case constants.ACTION_LOG_OUT:
      services = [];
      serviceStore.emitChange();
      break;
  }
});

export default serviceStore;
