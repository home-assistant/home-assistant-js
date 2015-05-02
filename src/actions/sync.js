import _ from 'lodash';
import dispatcher from '../app_dispatcher';
import constants from '../constants';
import { fetch as fetchData } from './bootstrap';

const SYNC_INTERVAL = 30000;

let isSyncing = false;

export function fetchAll() {
  dispatcher.dispatch({
    actionType: constants.ACTION_FETCH_ALL,
  });

  fetchData();

  if (isSyncing) {
    scheduleSync();
  }
}

let scheduleSync = _.debounce(fetchAll, SYNC_INTERVAL);

export function start() {
  isSyncing = true;

  fetchAll();
}

export function stop() {
  isSyncing = false;

  scheduleSync.cancel();
}
