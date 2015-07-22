import debounce from 'lodash/function/debounce';
import Flux from '../../flux';
import actionTypes from './action-types';
import * as getters from './getters';
import { callApi } from '../api';

import { actions as entityActions } from '../entity';
import { actions as serviceActions } from '../service';
import { actions as eventActions } from '../event';
import { actions as configActions } from '../config';

const SYNC_INTERVAL = 30000;

export function fetchAll() {
  const isSyncScheduled = Flux.evaluate(getters.isSyncScheduled);

  Flux.dispatch(actionTypes.API_FETCH_ALL_START, {});

  return callApi('GET', 'bootstrap').then(data => {
    entityActions.replaceData(data.states);
    serviceActions.replaceData(data.services);
    eventActions.replaceData(data.events);
    configActions.configLoaded(data.config);

    Flux.dispatch(actionTypes.API_FETCH_ALL_SUCCESS, {});

    if (isSyncScheduled) {
      scheduleSync();
    }
  }, message => {
    Flux.dispatch(actionTypes.API_FETCH_ALL_FAIL, {message});

    if (isSyncScheduled) {
      scheduleSync();
    }

    return Promise.reject(message);
  });
}

const scheduleSync = debounce(fetchAll, SYNC_INTERVAL);

export function start({skipInitialSync=false}={}) {
  Flux.dispatch(actionTypes.SYNC_SCHEDULED);

  if (skipInitialSync) {
    scheduleSync();
  } else {
    fetchAll();
  }
}

export function stop() {
  Flux.dispatch(actionTypes.SYNC_SCHEDULE_CANCELLED);
  scheduleSync.cancel();
}
