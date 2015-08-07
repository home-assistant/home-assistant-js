import debounce from 'lodash/function/debounce';
import actionTypes from './action-types';
import * as getters from './getters';
import { callApi } from '../api';

import { actions as entityActions } from '../entity';
import { actions as serviceActions } from '../service';
import { actions as eventActions } from '../event';
import { actions as configActions } from '../config';

const SYNC_INTERVAL = 30000;

export function fetchAll(reactor) {
  const isSyncScheduled = reactor.evaluate(getters.isSyncScheduled);

  reactor.dispatch(actionTypes.API_FETCH_ALL_START, {});

  return callApi(reactor, 'GET', 'bootstrap').then(data => {
    entityActions.replaceData(reactor, data.states);
    serviceActions.replaceData(reactor, data.services);
    eventActions.replaceData(reactor, data.events);
    configActions.configLoaded(reactor, data.config);

    reactor.dispatch(actionTypes.API_FETCH_ALL_SUCCESS, {});

    if (isSyncScheduled) {
      scheduleSync(reactor);
    }
  }, message => {
    reactor.dispatch(actionTypes.API_FETCH_ALL_FAIL, {message});

    if (isSyncScheduled) {
      scheduleSync(reactor);
    }

    return Promise.reject(message);
  });
}

const scheduleSync = debounce(fetchAll, SYNC_INTERVAL);

export function start(reactor, {skipInitialSync=false}={}) {
  reactor.dispatch(actionTypes.SYNC_SCHEDULED);

  if (skipInitialSync) {
    scheduleSync(reactor);
  } else {
    fetchAll(reactor);
  }
}

export function stop(reactor) {
  reactor.dispatch(actionTypes.SYNC_SCHEDULE_CANCELLED);
  scheduleSync.cancel();
}
