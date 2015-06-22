import Flux from '../../flux';
import isFetchingData from './stores/is-fetching-store';
import isSyncScheduled from './stores/is-sync-scheduled-store';
import * as _actions from './actions';
import * as _getters from './getters';

Flux.registerStores({isFetchingData, isSyncScheduled});

export const actions = _actions;
export const getters = _getters;
