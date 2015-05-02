import callApi from '../call_api';
import dispatcher from '../app_dispatcher';
import constants from '../constants';

import { newStates } from './state';
import { newServices } from './service';
import { newEvents } from './event';
import { newConfig } from './config';


export function newBootstrapData(data) {
  newStates(data.states, true);
  newServices(data.services);
  newEvents(data.events);
  newConfig(data.config);
}

export function fetch(authToken=false) {
  let apiCall;

  if (authToken) {
    apiCall = callApi('GET', 'bootstrap', false, {authToken: authToken});
  } else {
    apiCall = callApi('GET', 'bootstrap');
  }

  return apiCall.then(newBootstrapData);
}
