'use strict';

import dispatcher from '../app_dispatcher';
import constants from '../constants';
import * as eventActions from './event';
import * as stateActions from './state';
import * as serviceActions from './service';
import * as componentActions from './component';

const SYNC_INTERVAL = 30000;

let scheduledSync = null;

let stopSync = function() {
  clearTimeout(scheduledSync);
};

let scheduleSync = function() {
  stopSync();

  scheduledSync = setTimeout(start, SYNC_INTERVAL);
};

export function start() {
  fetchAll();

  scheduleSync();
}

export function stop() {
  stopSync();
}

export function fetchAll() {
  dispatcher.dispatch({
    actionType: constants.ACTION_FETCH_ALL,
  });

  eventActions.fetchAll();
  stateActions.fetchAll();
  serviceActions.fetchAll();
  componentActions.fetchAll();
}
