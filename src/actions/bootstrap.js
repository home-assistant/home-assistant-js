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
  return callApi('GET', 'bootstrap').then(newBootstrapData);
}
