import isFetchingData from './stores/is-fetching-store';
import isSyncScheduled from './stores/is-sync-scheduled-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({isFetchingData, isSyncScheduled});
}

export const actions = _actions;
export const getters = _getters;
