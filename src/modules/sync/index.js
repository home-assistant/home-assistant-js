import isFetchingData from './stores/is-fetching-store';
import * as _actions from './actions';
import * as _getters from './getters';

export function register(reactor) {
  reactor.registerStores({ isFetchingData });
}

export const actions = _actions;
export const getters = _getters;
