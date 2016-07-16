import actionTypes from './action-types';
import * as getters from './getters';
import { callApi } from '../api';
import debounce from '../../util/debounce';

import { actions as entityActions } from '../entity';
import { actions as serviceActions } from '../service';
import { actions as eventActions } from '../event';
import { actions as configActions } from '../config';
import { actions as panelActions } from '../panel';

const SYNC_INTERVAL = 30000;
const SCHEDULED_SYNCS = {};

function isSyncing(reactor) {
  return reactor.evaluate(getters.isSyncScheduled);
}

function scheduleSync(reactor) {
  if (!isSyncing(reactor)) {
    return;
  }
  if (!(reactor.hassId in SCHEDULED_SYNCS)) {
    /* eslint-disable no-use-before-define */
    SCHEDULED_SYNCS[reactor.hassId] = debounce(fetchAll.bind(null, reactor), SYNC_INTERVAL);
    /* eslint-enable no-use-before-define */
  }

  SCHEDULED_SYNCS[reactor.hassId]();
}

function unscheduleSync(reactor) {
  const sync = SCHEDULED_SYNCS[reactor.hassId];

  if (sync) {
    sync.clear();
  }
}

export function fetchAll(reactor) {
  reactor.dispatch(actionTypes.API_FETCH_ALL_START, {});

  return callApi(reactor, 'GET', 'bootstrap').then(data => {
    reactor.batch(() => {
      entityActions.replaceData(reactor, data.states);
      serviceActions.replaceData(reactor, data.services);
      eventActions.replaceData(reactor, data.events);
      configActions.configLoaded(reactor, data.config);
      panelActions.panelsLoaded(reactor, data.panels);

      reactor.dispatch(actionTypes.API_FETCH_ALL_SUCCESS, {});
    });

    scheduleSync(reactor);
  }, message => {
    reactor.dispatch(actionTypes.API_FETCH_ALL_FAIL, { message });

    scheduleSync(reactor);

    return Promise.reject(message);
  });
}

export function start(reactor, { skipInitialSync = false } = {}) {
  reactor.dispatch(actionTypes.SYNC_SCHEDULED);

  if (skipInitialSync) {
    scheduleSync(reactor);
  } else {
    fetchAll(reactor);
  }
}

export function stop(reactor) {
  reactor.dispatch(actionTypes.SYNC_SCHEDULE_CANCELLED);
  unscheduleSync(reactor);
}
